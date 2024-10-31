const { getBrowserAndPage, navigate, elem, getData, _wait } = require('../helper/scraper');
const { getDatetime } = require('../helper/functions');
const { get_by_lat_long } = require('../helper/data');
const { getLatLong } = require('../helper/functions');
const { logger } = require('../helper/log');
const { getDataHandler } = require('../helper/handler');

async function weatherdotcom_crawler(url) {
  let [latitude, longitude] = getLatLong(url)
  const city = get_by_lat_long(latitude, longitude).name;
  const { browser, page } = await getBrowserAndPage({ headless: true });
  await navigate(page, url);
  console.log("URL", url);
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

  // Getting data from the page
  await Promise.all([
    getDataHandler(page, weatherData, 'css', '[class^="TodayDetailsCard--feelsLikeContainer--"]', 'feelLikeTemp', 'Error getting feel like temp'),
    getDataHandler(page, weatherData, 'css', '[data-testid="SunriseValue"]', 'sunrise', 'Error getting sunrise'),
    getDataHandler(page, weatherData, 'css', '[data-testid="SunsetValue"]', 'sunset', 'Error getting sunset'),
    getDataHandler(page, weatherData, 'css', '[class^="CurrentConditions--phraseValue--"]', 'currentCondition', 'Error getting current condition'),
    getDataHandler(page, weatherData, 'css', '[class^="CurrentConditions--tempHiLoValue--"]', 'day_night', 'Error getting day night'),
    getDataHandler(page, weatherData, 'css', '[class^="CurrentConditions--tempValue--"]', 'temp', 'Error getting temp'),
  ]);

  if (weatherData.day_night) {
    [weatherData.day, weatherData.night] = weatherData.day_night.split("•").map(item => item.trim());
  }

  try {
    const airQualityWrapper = await elem(page, 'css', '[class^="AirQuality--AirQualityCard--"]');
    weatherData.airQualityNumber = await getData(airQualityWrapper, 'tag', 'text', 'text');
    weatherData.airQualityText = await getData(airQualityWrapper, 'tag', 'span');
    weatherData.airQualityDescription = await getData(airQualityWrapper, 'tag', 'p');
  } catch (err) {
    logger.error("Error getting air quality data:", err.message);
  }

  // Getting weather details
  const weatherDetailWrapper = await page.$$('[data-testid="WeatherDetailsListItem"]');
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
    if (weatherDetailKey === 'Wind') {
      // Try to get wind direction from the same element
      try {
        const windDirectionElement = await weatherDetailWrapper[i].$('div:nth-child(3) > span > span');
        if (windDirectionElement) {
          weatherData.windDirectin = await windDirectionElement.innerHTML();
        } else {
          weatherData.windDirectin = '';
        }
      } catch {
        weatherData.windDirectin = '';
      }
    } else if (weatherDetailKey === 'High / Low') {
      // Try to get high and low from the same element
      try {
        const highLowElement = await weatherDetailWrapper[i].$('div:nth-child(3)');
        if (highLowElement) {
          const highLowTemp = await highLowElement.innerText();
          if (highLowTemp) {
            [weatherData.high, weatherData.low] = highLowTemp.split("/");
          }
        } else {
          [weatherData.high, weatherData.low] = ['', ''];
        }
      } catch {
        [weatherData.high, weatherData.low] = ['', ''];
      }
    }
    weatherDetailObj[weatherDetailKey] = weatherDetailValue;
  }

  // Assigning weather detail values to weatherData object
  weatherData.wind = weatherDetailObj['Wind'];
  weatherData.humidity = weatherDetailObj['Humidity'];
  weatherData.dewPoint = weatherDetailObj['Dew Point'];
  weatherData.pressure = weatherDetailObj['Pressure'].replace(/\n/g, '');
  weatherData.uv_index = weatherDetailObj['UV Index'];
  weatherData.Visibility = weatherDetailObj['Visibility'];
  weatherData.moonPhase = weatherDetailObj['Moon Phase'];



  // If not found from same element approach, fallback to id
  if (weatherData.high === '' || weatherData.low === '') {
    try {
      const highLow = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[1]/div[2]');
      const highLowTemp = await highLow.innerText();
      if (highLowTemp) {
        [weatherData.high, weatherData.low] = highLowTemp.split("/");
      }
    } catch (err) {
      logger.error("Error getting high/low temperature:", err.message);
    }
  }

  if (weatherData.windDirectin === '') {
    try {
      const windDirection = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[2]/div[2]/span/span[1]');
      weatherData.windDirectin = await windDirection.innerHTML();
    } catch (err) {
      logger.error("Error getting wind direction");
      logger.error(err.message);
    }
  }



  logger.info("Scraping completed");

  // close the browser
  await browser.close();
  return weatherData;
}

module.exports = {
  weatherdotcom_crawler
};
