const fs = require('fs');
const path = require('path');
const { cities } = require('./helper/data');
const Spider = require('./helper/Spider'); // replace './Spider' with the actual path to your Spider file
// const Notification = require('./Notification'); // replace './Notification' with the actual path to your Notification file
const { fileToSet } = require('./helper/functions');

// Number of threads.
const NO_OF_THREADS = 4;

// Base URL
const base_url = "https://weather.com/weather/today/l/";

// Create file crawled.txt.
fs.writeFileSync("crawled.txt", "");

// fs.writeFileSync("data/latest.csv", "date,country,latitude,longitude,city,currentCondition,temp,feelLikeTemp,wind,Wind Directin,uv_index,VisibilityValue,pressure,humidity,dewPoint,moonPhase,high,low,sunset,sunrise,airQualityNumber,airQualityText,airQualityDescription\n");

// urls to file.
fs.writeFileSync('queue.txt', cities.map(city => `${base_url}${city['lat']},${city['lng']}?unit=c`).join("\n"));

console.log('Queue file created successfully.');

Spider.init("weather.com");

// write cities into queue.
cities.forEach(async (city) => {
    // console.log(`${base_url}${city['lat']},${city['lng']}?unit=c`);
    // base_url + city['lat'] + ',' + city['lng'] + "?unit=c" + "\n"
    let link = `${base_url}${city['lat']},${city['lng']}?unit=c`;
    // await Spider.crawl_page(`Thread ${1}`, link);
    fs.appendFileSync('queue.txt', `${link}\n`);
});

let queue = new Set();

function workers() {
    for (let i = 0; i < NO_OF_THREADS; i++) {
        work();
    }
}

async function work() {
    while (true) {
        const url = Array.from(queue).shift();
        console.log ("URL", queue)
        if (url) {
            await Spider.crawl_page(`Thread ${queue.length}`, url);
        } else {
            break;
        }
    }
}

function jobs() {
    const queued_links = fileToSet("queue.txt");
    //queue.push(...queued_links);
    // push element to set.
    queued_links.forEach(link => queue.add(link));
   // console.log("Queue", queue);
    crawl();
}

function crawl() {
    queued_links = fileToSet("queue.txt");
    if (queued_links.size > 0) {
        // console.log(`${queued_links.size} links in the queue`);
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

// pak_weather();

(async () => {
    let link = "https://weather.com/weather/today/l/25.8072,66.6219?unit=c"
    await Spider.crawl_page(`Thread ${1}`, link);
})();