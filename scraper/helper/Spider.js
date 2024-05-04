const fs = require('fs');
const path = require('path');
const { get_by_lat_long } = require('./data');
const { fileToSet, setToFile, get_datetime } = require('./functions');
const { getBrowser, navigate, elem, getData, _wait } = require('./scraper');
const providers = require('../provider/providers');

const Spider = {
    site: '',
    queue_file: 'queue.txt',
    crawled_file: 'crawled.txt',
    queue: new Set(),
    crawled: new Set(),

    init(site) {
        this.site = site;
        this.boot();
    },

    boot() {
        this.queue = fileToSet(this.queue_file);
        this.crawled = fileToSet(this.crawled_file);
    },

    async crawl_page(thread_name, page_url) {
        console.log(`${thread_name} now crawling ${page_url}`);
        const data = await providers[this.site](page_url);
        console.log(data);
        this.queue.delete(page_url);
        this.crawled.add(page_url);
        this.updateFiles();
    },

    updateFiles() {
        setToFile(this.queue, this.queue_file);
        setToFile(this.crawled, this.crawled_file);
    }
};

module.exports = Spider;
