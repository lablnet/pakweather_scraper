const { getBrowserAndPage, navigate, elem, getData, _wait } = require('../helper/scraper');
const { getDatetime } = require('../helper/functions');
const { get_by_lat_long } = require('../helper/data');
const { getLatLong } = require('../helper/functions');
const { logger } = require('../helper/log');
const { getDataHandler } = require('../helper/handler');

async function weatherdotcom_crawler(url) {
    let [latitude, longitude]  = getLatLong(url)
    const city = get_by_lat_long(latitude, longitude).name;
    const { browser, page } = await getBrowserAndPage({headless: true});
    await navigate(page, url);
    console.log ("URL", url);
    // sleep for 1 seconds
    await _wait(1000);
    const date = getDatetime();
  
    weatherData = {
        "date": date,
        "country": "pakistan",
        "latitude": latitude,
        "longitude": longitude,
        "city": city,
        "currentCondition": '',
        'day_night': '',
        'day': '',
        'night': '',
        "temp": '',
        "feelLikeTemp": '',
        "wind": '',
        "windDirectin": '',
        "uv_index": '',
        "Visibility": '',
        "pressure": '',
        "humidity": '',
        "dewPoint": '',
        "moonPhase": '',
        "high": '',
        "low": '',
        "sunset": '',
        "sunrise": '',
        "airQualityNumber": '',
        "airQualityText": '',
        "airQualityDescription": '',
        "site": "weather.com",
    }

    // Getting data from the page (issue here)
    await Promise.all([
        getDataHandler(page, weatherData, 'class', 'TodayDetailsCard--feelsLikeTempValue--8WgHV', 'feelLikeTemp', 'Error getting feel like temp'),
        getDataHandler(page, weatherData, 'tag', '[data-testid="SunriseValue"]', 'sunrise', 'Error getting sunrise'),
        getDataHandler(page, weatherData, 'tag', '[data-testid="SunsetValue"]', 'sunset', 'Error getting sunset'),
        getDataHandler(page, weatherData, 'class', 'CurrentConditions--phraseValue---VS-k', 'currentCondition', 'Error getting current condition'),
        getDataHandler(page, weatherData, 'class', 'CurrentConditions--tempHiLoValue--Og9IG', 'day_night', 'Error getting day night'),
        getDataHandler(page, weatherData, 'class', 'CurrentConditions--tempValue--zUBSz', 'temp', 'Error getting temp'),
    ]);

    if (weatherData.day_night) {
      [weatherData.day, weatherData.night] = weatherData.day_night.split("•").map(item => item.trim());
    }

    try {
        const airQualityWrapper = await elem(page, 'class', 'AirQuality--AirQualityCard--4GWPb');
        weatherData.airQualityNumber = await getData(airQualityWrapper, 'tag', 'text', 'text');
        weatherData.airQualityText = await getData(airQualityWrapper, 'tag', 'span');
        weatherData.airQualityDescription = await getData(airQualityWrapper, 'tag', 'p');
    } catch (err) {
        logger.error("Error getting air quality data:", err.message);
    }

    // Getting weather details
    const weatherDetailWrapper = await page.$$('div.WeatherDetailsListItem--WeatherDetailsListItem--HLP3I');
    const countWeatherDetailWrapper = weatherDetailWrapper.length;
    let weatherDetailObj = {};
    for (let i = 0; i < countWeatherDetailWrapper; i++) {
      let weatherDetailKey;
      let weatherDetailValue;
      try {
        weatherDetailKey = await weatherDetailWrapper[i].$('div');
        weatherDetailKey = await weatherDetailKey.innerText();
      } catch {
        weatherDetailKey = 'unknown';
      }
      try {
        weatherDetailValue = await weatherDetailWrapper[i].$('span');
        weatherDetailValue = await weatherDetailValue.innerText();
      } catch {
        weatherDetailValue = await weatherDetailWrapper[i].$('div[data-testid="wxData"]');
        weatherDetailValue = await weatherDetailValue.innerText();
      }
      weatherDetailObj[weatherDetailKey] = weatherDetailValue;
    }

    // Assigning weather detail values to weatherData object
    // [weatherData.high, weatherData.low] = weatherDetailObj['High / Low'].split("/");
    weatherData.wind = weatherDetailObj['Wind'];
    weatherData.humidity = weatherDetailObj['Humidity'];
    weatherData.dewPoint = weatherDetailObj['Dew Point'];
    weatherData.pressure = weatherDetailObj['Pressure'];
    weatherData.uv_index = weatherDetailObj['UV Index'];
    weatherData.Visibility = weatherDetailObj['Visibility'];
    weatherData.moonPhase = weatherDetailObj['Moon Phase'];

    // Getting high and low temperature
    try {
        const highLow = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[1]/div[2]');
        const highLowTemp = await highLow.innerText();
        if (highLowTemp) {
            [weatherData.high, weatherData.low] = highLowTemp.split("/");
        }
        console.log([weatherData.high, weatherData.low])
    } catch (err) {
        logger.error("Error getting high/low temperature:", err.message);
    }

    try {
      const windDirection = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[2]/div[2]/span/span[1]');
      weatherData.windDirectin = await windDirection.innerHTML();
      console.log("Wind Direction", weatherData.windDirectin);
    } catch (err) {
      logger.error("Error getting wind direction");
      logger.error(err.message);
    }
  
    logger.info("Scraping completed");

    // close the browser
    await browser.close();
    return weatherData;
}

module.exports = {
    weatherdotcom_crawler
};
