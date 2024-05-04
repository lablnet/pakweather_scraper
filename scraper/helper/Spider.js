const fs = require('fs');
const path = require('path');
const { get_by_lat_long } = require('./data');
const { fileToSet, setToFile, get_datetime } = require('./functions');
const { getBrowser, navigate, elem, getData, _wait } = require('./scraper');
const providers = require('../provider/providers');

const Spider = {
    site: '',
    init(site) {
        this.site = site;
    },

    async crawl_page(thread_name, page_url) {
        console.log(`${thread_name} now crawling ${page_url}`);
        const data = await providers[this.site](page_url);


        console.log("Data saved successfully.");
    },
};

module.exports = Spider;
