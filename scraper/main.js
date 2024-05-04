const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');
const fs = require('fs').promises;
const { cities } = require('./helper/data');
const Spider = require('./helper/Spider');

const NO_OF_THREADS = 4;
const site = process.argv[2] || "weather.com";
const base_url = "https://weather.com/weather/today/l/";
let urlSet = new Set();
Spider.init(site );

async function initializeQueue() {
    const urls = cities.map(city => `${base_url}${city.lat},${city.lng}?unit=c`);
    let i = 1;
    for (const url of urls) {
        urlSet.add(url);
        i++;
        if (i > 10) {
            break;
        }
    }
    console.log('Queue initialized successfully.');
    return urls;
}

if (isMainThread) {
    (async () => {
        await initializeQueue();
        const urlArray = Array.from(urlSet);
        console.log (`Total urls: ${urlArray.length}`);

        const segmentSize = Math.ceil(urlArray.length / NO_OF_THREADS);
        for (let i = 0; i < NO_OF_THREADS; i++) {
            const workerUrls = urlArray.slice(i * segmentSize, (i + 1) * segmentSize);
            new Worker(__filename, { workerData: { urls: workerUrls, id: i + 1 } });
        }
    })();
} else {
    (async () => {
        const { urls, id } = workerData;
        for (const url of urls) {
            await Spider.crawl_page(`Thread ${id}`, url);
            console.log(`Thread ${id} processed ${url}`);
        }
        parentPort.postMessage(`Worker ${id} done`);
    })();
}
