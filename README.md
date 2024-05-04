[![Pakistan Weather](https://github.com/lablnet/pakweather_scrapper/actions/workflows/weather.yaml/badge.svg)](https://github.com/lablnet/pakweather_scrapper/actions/workflows/weather.yaml)

# Overview
A multi-threaded **Pakistan** Weather crawler written in JavaScript learn more at : [https://lablnet.com/project/weather](https://lablnet.com/project/weather)

## Purpose
The sole purpose of this project is to extract weather data from the Weather Channel and store it in a database for further analysis.

## Requirements
* Node.js 18.x or above

## Installation
1. Clone the repository
2. Install dependencies using `npm install` or `pnpm install`
3. Copy `.env.example` to `.env` and update the values
4. Run the crawler using `node main.js weather.com`
	* The first argument is the website to crawl
	* You can add more crawlers; check the `main.js` file for more information

## Contributions
There is still a lot of work to be done, so feel free to contribute by opening a PR.

### Contributing Guide
[Contribution Guidelines](https://github.com/lablnet/pakweather_scraper/blob/main/CONTRIBUTING.md)

## LICENSE
* MIT

## Readme of Web
* [Web](./web/README.md)

### Python Version
* The script has been rewritten in Node.js to fix issues and update the structure. The Python version is available in the `python_script` folder but is no longer maintained.
* [Python](./python_script/README.md)
