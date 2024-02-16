const fs = require('fs');
const path = require('path');
const { cities } = require('./helper/data');
const { file_to_set, set_to_file, get_datetime } = require('./helper/functions');
const Spider = require('./helper/Spider'); // replace './Spider' with the actual path to your Spider file
// const Notification = require('./Notification'); // replace './Notification' with the actual path to your Notification file

// Number of threads.
const NO_OF_THREADS = 4;

// Base URL
const base_url = "https://weather.com/weather/today/l/";

// Create file crawled.txt.
fs.writeFileSync("crawled.txt", "");

// fs.writeFileSync("data/latest.csv", "date,country,latitude,longitude,city,currentCondition,temp,feelLikeTemp,wind,Wind Directin,uv_index,VisibilityValue,pressure,humidity,dewPoint,moonPhase,high,low,sunset,sunrise,airQualityNumber,airQualityText,airQualityDescription\n");

// urls to file.
fs.writeFileSync('queue.txt', cities.map(city => `${base_url}${city['lat']},${city['lng']}?unit=c`).join("\n"));

const queue = [];
Spider.init("weather.com");

function workers() {
    for (let i = 0; i < NO_OF_THREADS; i++) {
        work();
    }
}

async function work() {
    while (true) {
        const url = queue.shift();
        if (url) {
            await Spider.crawl_page(`Thread ${queue.length}`, url);
        } else {
            break;
        }
    }
}

function jobs() {
    const queued_links = file_to_set("queue.txt");
    queue.push(...queued_links);
    crawl();
}

function crawl() {
    if (queue.length > 0) {
        console.log(`${queue.length} links in the queue`);
        jobs();
    } else {
        console.log("No more links in the queue");
        console.log("Done");
        fs.unlinkSync("queue.txt");
        fs.unlinkSync("crawled.txt");
        // Notification.email(
        //     process.env.EMAIL,
        //     "Pak Weather Notification" + " " + new Date().toISOString(),
        //     "Weather data has been crawled successfully."
        // );
    }
}

function pak_weather() {
    workers();
    crawl();
}

pak_weather();
