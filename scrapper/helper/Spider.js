const fs = require('fs');
const path = require('path');
const { get_by_lat_long } = require('./data');
const { fileToSet, setToFile, get_datetime } = require('./functions');
const { getBrowser, navigate, elem, getData, _wait } = require('./scrapper');

const Spider = {
    urls: [],
    queue_file: 'queue.txt',
    crawled_file: 'crawled.txt',
    queue: new Set(),
    crawled: new Set(),

    init(urls) {
        this.urls = urls;
        this.boot();
    },

    boot() {
        this.queue = fileToSet(this.queue_file);
        //console.log (this.queue);
        this.crawled = fileToSet(this.crawled_file);
    },

    async load_page(url) {
        const browser = await getBrowser({ headless: false });
        const page = await browser.newPage();
        console.log ("URL", url);
        try {
            await navigate(page, url);
            return page;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async crawl_page(thread_name, page_url) {
        //if (this.queue.has(page_url)) {
            console.log(`${thread_name} now crawling ${page_url}`);
            const page = await this.load_page(page_url);
            console.log ("Page", page);
            if (page) {
                // Get latitude from URL.
                const [latitude, longitude] = get_by_lat_long(page_url);
                let city = get_by_lat_long(latitude, longitude);
                city = city.length ? city[0]['name'] : null;
                console.log ("City", city);
                // Get required data.
                const currentCondition = await getData(page, 'class', 'CurrentConditions--phraseValue--mZC_p', 'text');
                if (!city) {
                    city = await getData(page, 'class', 'CurrentConditions--location--1YWj_', 'text');
                }
                let temp = await getData(page, 'class', 'CurrentConditions--tempValue--MHmYY', 'text');
                let feelLikeTemp = await getData(page, 'class', 'TodayDetailsCard--feelsLikeTempValue--2icPt', 'text');
                const details = await elem(page, 'class', 'TodayDetailsCard--detailsContainer--2yLtL');
                let wind = await getData(page, 'class', 'Wind--windWrapper--3Ly7c', 'text');
                const windDirection = await elem(page, 'class', 'Wind--windWrapper--3Ly7c').$('svg');
                const uv_index = await getData(details, 'data-testid', 'UVIndexValue', 'text');
                const VisibilityValue = await getData(details, 'data-testid', 'VisibilityValue', 'text');
                let pressure = await getData(details, 'data-testid', 'PressureValue', 'text');
                const humidity = await getData(details, 'data-testid', 'PercentageValue', 'text');
                const _data = await elem(details, 'class', 'WeatherDetailsListItem--WeatherDetailsListItem--1CnRC').$$('div');
                const dewPoint = await getData(_data[3], 'data-testid', 'TemperatureValue', 'text');
                const moonPhase = await getData(_data[_data.length - 1], 'default', '', 'text');
                const temps = await _data[0].$$('data-testid', 'TemperatureValue');
                let high = await getData(temps[0], 'default', '', 'text');
                let low = await getData(temps[1], 'default', '', 'text');
                let sunset = await elem(page, 'class', 'SunriseSunset--datesContainer--2cHyj');
                sunset = sunset ? await getData(sunset, 'default', '', 'text') : null;
                let sunrise = await elem(page, 'class', 'SunriseSunset--sunsetDateItem--1nyxW');
                sunrise = sunrise ? await getData(sunrise, 'default', '', 'text') : null;
                let airQuality = await elem(page, 'class', 'AirQuality--col--3I-4C');
                const airQualityNumber = airQuality ? await getData(airQuality, 'default', '', 'text') : null;
                const airQualityText = await getData(page, 'class', 'AirQualityText--severity--1smy9', 'text');
                const airQualityDescription = await getData(page, 'class', 'AirQualityText--severityText--1wSKp', 'text');

                // Refactor data.
                try {
                    temp = temp.replace("°", " c");
                    feelLikeTemp = feelLikeTemp.replace("°", " c");
                    low = low.replace("°", " c");
                    high = high.replace("°", " c");
                    pressure = pressure.replace("Arrow Down", "Down ");
                    wind = wind.replace("Wind Direction", " ");
                    moonPhase = moonPhase.replace("Moon Phase", "");
                } catch (_) {
                }

                // Get current datetime of GMT+05:00
                const date = get_datetime();

                // Latest Data dict.
                const latestData = {
                    "date": date,
                    "country": "pakistan",
                    "latitude": latitude,
                    "longitude": longitude,
                    "city": city,
                    "currentCondition": currentCondition,
                    "temp": temp,
                    "feelLikeTemp": feelLikeTemp,
                    "wind": wind,
                    "Wind Directin": windDirection,
                    "uv_index": uv_index,
                    "VisibilityValue": VisibilityValue,
                    "pressure": pressure,
                    "humidity": humidity,
                    "dewPoint": dewPoint,
                    "moonPhase": moonPhase,
                    "high": high,
                    "low": low,
                    "sunset": sunset,
                    "sunrise": sunrise,
                    "airQualityNumber": airQualityNumber,
                    "airQualityText": airQualityText,
                    "airQualityDescription": airQualityDescription
                }

                console.log (latestData);
                // Get current year.
                const year = date.getFullYear();
                // Get current month name.
                const month = date.toLocaleString('default', { month: 'long' });

                // // Check if the year directory exists inside data directory.
                // if (!fs.existsSync(path.join('data', String(year)))) {
                //     // Create it.
                //     fs.mkdirSync(path.join('data', String(year)));
                // }

                // // Check If file is not exists.
                // if (!fs.existsSync(path.join('data', String(year), `${month}.csv`))) {
                //     // Create the file.
                //     fs.writeFileSync(path.join('data', String(year), `${month}.csv`), "date,country,latitude,longitude,city,currentCondition,temp,feelLikeTemp,wind,Wind Directin,uv_index,VisibilityValue,pressure,humidity,dewPoint,moonPhase,high,low,sunset,sunrise,airQualityNumber,airQualityText,airQualityDescription\n");
                // }

                // // append data to file.
                // fs.appendFileSync(path.join('data', String(year), `${month}.csv`), `${date},${latestData['country']},${latestData['latitude']},${latestData['longitude']},${latestData['city']},${latestData['currentCondition']},${latestData['temp']},${latestData['feelLikeTemp']},${latestData['wind']},${latestData['Wind Directin']},${latestData['uv_index']},${latestData['VisibilityValue']},${latestData['pressure']},${latestData['humidity']},${latestData['dewPoint']},${latestData['moonPhase']},${latestData['high']},${latestData['low']},${latestData['sunset']},${latestData['sunrise']},${latestData['airQualityNumber']},${latestData['airQualityText']},${latestData['airQualityDescription']}\n`);
                // console.log("Data saved successfully.");

                // // Latest Data.
                // fs.appendFileSync("data/latest.csv", `${date},${latestData['country']},${latestData['latitude']},${latestData['longitude']},${latestData['city']},${latestData['currentCondition']},${latestData['temp']},${latestData['feelLikeTemp']},${latestData['wind']},${latestData['Wind Directin']},${latestData['uv_index']},${latestData['VisibilityValue']},${latestData['pressure']},${latestData['humidity']},${latestData['dewPoint']},${latestData['moonPhase']},${latestData['high']},${latestData['low']},${latestData['sunset']},${latestData['sunrise']},${latestData['airQualityNumber']},${latestData['airQualityText']},${latestData['airQualityDescription']}\n`);

                // this.queue.delete(page_url);
                // this.crawled.add(page_url);
                // this.updateFiles();
            }
        //}
    },

    updateFiles() {
        setToFile(this.queue, this.queue_file);
        setToFile(this.crawled, this.crawled_file);
    }
};

module.exports = Spider;
