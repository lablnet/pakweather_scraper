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

  // Getting data from the page with error handling
  const dataPromises = [
    getDataHandler(page, weatherData, 'css', '[class^="TodayDetailsCard--feelsLikeContainer--"]', 'feelLikeTemp', 'Error getting feel like temp').catch(() => {
      logger.error(`Missing feelLikeTemp data for URL: ${url}`);
      weatherData.feelLikeTemp = null;
    }),
    getDataHandler(page, weatherData, 'css', '[data-testid="SunriseValue"]', 'sunrise', 'Error getting sunrise').catch(() => {
      logger.error(`Missing sunrise data for URL: ${url}`);
      weatherData.sunrise = null;
    }),
    getDataHandler(page, weatherData, 'css', '[data-testid="SunsetValue"]', 'sunset', 'Error getting sunset').catch(() => {
      logger.error(`Missing sunset data for URL: ${url}`);
      weatherData.sunset = null;
    }),
    getDataHandler(page, weatherData, 'css', '[class^="CurrentConditions--phraseValue--"]', 'currentCondition', 'Error getting current condition').catch(() => {
      logger.error(`Missing currentCondition data for URL: ${url}`);
      weatherData.currentCondition = null;
    }),
    getDataHandler(page, weatherData, 'css', '[class^="CurrentConditions--tempHiLoValue--"]', 'day_night', 'Error getting day night').catch(() => {
      logger.error(`Missing day_night data for URL: ${url}`);
      weatherData.day_night = null;
    }),
    getDataHandler(page, weatherData, 'css', '[class^="CurrentConditions--tempValue--"]', 'temp', 'Error getting temp').catch(() => {
      logger.error(`Missing temp data for URL: ${url}`);
      weatherData.temp = null;
    }),
  ];

  await Promise.all(dataPromises);

  if (weatherData.day_night) {
    [weatherData.day, weatherData.night] = weatherData.day_night.split("•").map(item => item.trim());
  }

  try {
    const airQualityWrapper = await elem(page, 'css', '[class^="AirQuality--AirQualityCard--"]');
    weatherData.airQualityNumber = await getData(airQualityWrapper, 'tag', 'text', 'text');
    weatherData.airQualityText = await getData(airQualityWrapper, 'tag', 'span');
    weatherData.airQualityDescription = await getData(airQualityWrapper, 'tag', 'p');
  } catch (err) {
    logger.error(`Missing air quality data for URL: ${url} - ${err.message}`);
    weatherData.airQualityNumber = null;
    weatherData.airQualityText = null;
    weatherData.airQualityDescription = null;
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
      try {
        weatherDetailValue = await weatherDetailWrapper[i].$('div[data-testid="wxData"]');
        weatherDetailValue = await weatherDetailValue.innerText();
      } catch {
        weatherDetailValue = null;
      }
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
          [weatherData.high, weatherData.low] = [null, null];
        }
      } catch {
        [weatherData.high, weatherData.low] = [null, null];
      }
    }
    weatherDetailObj[weatherDetailKey] = weatherDetailValue;
  }

  // Assigning weather detail values to weatherData object with null checks
  try {
    weatherData.wind = weatherDetailObj['Wind'] || null;
    if (!weatherData.wind) {
      logger.error(`Missing wind data for URL: ${url}`);
    }
  } catch {
    weatherData.wind = null;
    logger.error(`Missing wind data for URL: ${url}`);
  }

  try {
    weatherData.humidity = weatherDetailObj['Humidity'] || null;
    if (!weatherData.humidity) {
      logger.error(`Missing humidity data for URL: ${url}`);
    }
  } catch {
    weatherData.humidity = null;
    logger.error(`Missing humidity data for URL: ${url}`);
  }

  try {
    weatherData.dewPoint = weatherDetailObj['Dew Point'] || null;
    if (!weatherData.dewPoint) {
      logger.error(`Missing dewPoint data for URL: ${url}`);
    }
  } catch {
    weatherData.dewPoint = null;
    logger.error(`Missing dewPoint data for URL: ${url}`);
  }

  try {
    if (weatherDetailObj['Pressure']) {
      weatherData.pressure = weatherDetailObj['Pressure'].replace(/\n/g, '');
    } else {
      weatherData.pressure = null;
      logger.error(`Missing pressure data for URL: ${url}`);
    }
  } catch {
    weatherData.pressure = null;
    logger.error(`Missing pressure data for URL: ${url}`);
  }

  try {
    weatherData.uv_index = weatherDetailObj['UV Index'] || null;
    if (!weatherData.uv_index) {
      logger.error(`Missing uv_index data for URL: ${url}`);
    }
  } catch {
    weatherData.uv_index = null;
    logger.error(`Missing uv_index data for URL: ${url}`);
  }

  try {
    weatherData.Visibility = weatherDetailObj['Visibility'] || null;
    if (!weatherData.Visibility) {
      logger.error(`Missing Visibility data for URL: ${url}`);
    }
  } catch {
    weatherData.Visibility = null;
    logger.error(`Missing Visibility data for URL: ${url}`);
  }

  try {
    weatherData.moonPhase = weatherDetailObj['Moon Phase'] || null;
    if (!weatherData.moonPhase) {
      logger.error(`Missing moonPhase data for URL: ${url}`);
    }
  } catch {
    weatherData.moonPhase = null;
    logger.error(`Missing moonPhase data for URL: ${url}`);
  }

  // If not found from same element approach, fallback to id
  if (weatherData.high === '' || weatherData.low === '' || weatherData.high === null || weatherData.low === null) {
    try {
      const highLow = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[1]/div[2]');
      const highLowTemp = await highLow.innerText();
      if (highLowTemp) {
        [weatherData.high, weatherData.low] = highLowTemp.split("/");
      }
    } catch (err) {
      logger.error(`Missing high/low temperature for URL: ${url} - ${err.message}`);
      weatherData.high = weatherData.high || null;
      weatherData.low = weatherData.low || null;
    }
  }

  if (weatherData.windDirectin === '' || weatherData.windDirectin === null) {
    try {
      const windDirection = await elem(page, 'xpath', '//*[@id="todayDetails"]/section/div/div[2]/div[2]/div[2]/span/span[1]');
      weatherData.windDirectin = await windDirection.innerHTML();
    } catch (err) {
      logger.error(`Missing wind direction for URL: ${url} - ${err.message}`);
      weatherData.windDirectin = null;
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
