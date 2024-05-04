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

    await Promise.all([
        getDataHandler(page, weatherData, 'class', 'TodayDetailsCard--feelsLikeTempValue--2icPt', 'feelLikeTemp', 'Error getting feel like temp'),
        getDataHandler(page, weatherData, 'tag', '[data-testid="SunriseValue"]', 'sunrise', 'Error getting sunrise'),
        getDataHandler(page, weatherData, 'tag', '[data-testid="SunsetValue"]', 'sunset', 'Error getting sunset'),
        getDataHandler(page, weatherData, 'class', 'CurrentConditions--phraseValue--mZC_p', 'currentCondition', 'Error getting current condition'),
        getDataHandler(page, weatherData, 'class', 'CurrentConditions--tempHiLoValue--3T1DG', 'day_night', 'Error getting day night'),
        getDataHandler(page, weatherData, 'class', 'CurrentConditions--tempValue--MHmYY', 'temp', 'Error getting temp'),
    ]);

    if (weatherData.day_night) {
      const tempHiLoArr = weatherData.day_night.split("•");
      weatherData.day = tempHiLoArr[0].trim();
      weatherData.night = tempHiLoArr[1].trim();
    }


    // get elem by class AirQuality--AirQualityCard--EONAt
    try {
      const airQualityWrapper = await elem(page, 'class', 'AirQuality--AirQualityCard--EONAt');
      try {
        weatherData.airQualityNumber = await getData(airQualityWrapper, 'tag', 'text', 'text');
      } catch (err) {
        logger.error("Error getting air quality number");
        logger.error(err.message);
      }
      try {
        weatherData.airQualityText = await getData(airQualityWrapper, 'tag', 'span');
      } catch (err) {
        logger.error("Error getting air quality text");
        logger.error(err.message);
      }
      try {
        weatherData.airQualityDescription = await getData(airQualityWrapper, 'tag', 'p');
      } catch (err) {
        logger.error("Error getting air quality description");
        logger.error(err.message);
      }
    } catch (err) {
      logger.error("Error getting air quality wrapper");
      logger.error(err.message);
    }

    const weatherDetailWrapper = await page.$$('div.WeatherDetailsListItem--WeatherDetailsListItem--1CnRC');
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
    weatherData.wind = weatherDetailObj['Wind'];
    weatherData.humidity = weatherDetailObj['Humidity'];
    weatherData.dewPoint = weatherDetailObj['Dew Point'];
    weatherData.pressure = weatherDetailObj['Pressure'];
    weatherData.uv_index = weatherDetailObj['UV Index'];
    weatherData.Visibility = weatherDetailObj['Visibility'];
    weatherData.moonPhase = weatherDetailObj['Moon Phase'];

    try {
      const highLow = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[1]/div[2]');
      let highLowTemp = await highLow.innerText();
      if (highLowTemp) {
        highLowTemp = highLowTemp.split("/");
        weatherData.high = highLowTemp[0];
        weatherData.low = highLowTemp[1];
      }
    } catch (err) {
      logger.error("Error getting high low temp");
      logger.error(err.message);
    }

    try {
      const windDirection = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[2]/div[2]/span/span[1]');
      weatherData.windDirectin = await windDirection.innerHTML();
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
