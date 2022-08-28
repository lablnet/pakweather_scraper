[![Pakistan Weather](https://github.com/lablnet/pakweather_scrapper/actions/workflows/weather.yaml/badge.svg)](https://github.com/lablnet/pakweather_scrapper/actions/workflows/weather.yaml)

[![Web Build and Deploy](https://github.com/lablnet/pakweather_scrapper/actions/workflows/deploy.yml/badge.svg)](https://github.com/lablnet/pakweather_scrapper/actions/workflows/deploy.yml)

# Overview  
A multi-threaded **Pakistan** Weather crawler  written in Python    

| ⚠️ Note                                                                    |
|:-----------------------------------------------------------------------------|
| 
- Multithreading does not affect the network throughput, it only splits the urls into multiple threads which wait in the network queue. But the data updating in the file is concurrent. <br>
    - For example, if the 1st thread is updating data in the file at the same time the 2nd thread is fetching data from the network, the 2nd thread does not have to wait for the 1st thread to finish.


## Purpose
The sole purpose of this project is to get the weather data of Pakistan from Weather Channel and store it in a database/csv. The data is then can be used for further analysis.

## Requirements
- Python 3.6 or higher
    
## Installation
- Clone the repository
- Install the requirements using `pip install -r requirements.txt`
- Run the crawler using `python3 src/main.py`

## Contributions
There is still a lot of work to do, so feel free to contribute to open `PR`

###  Contrubuting guide
[Contribution Guidelines](https://github.com/lablnet/pakweather_scrapper/blob/main/CONTRIBUTING.md)

## LICENSE
- GPLv3

## Readme of Web
- [Web](./web/README.md)
