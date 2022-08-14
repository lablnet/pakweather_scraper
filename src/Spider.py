"""Spider.py is a spider file for main."""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.0"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"


import requests
import os
import datetime
from requests import HTTPError, Timeout
from bs4 import BeautifulSoup
from nullsafe import _nullsfae
from helper import *
from data.data import get_by_lat_long


class Spider:

    urls = []
    queue_file = 'queue.txt'
    crawled_file = 'crawled.txt'
    queue = set()
    crawled = set()

    def __init__(self, urls: list):
        """
        Constructor.
        :param urls: list of urls
        :author Muhammad Umer Farooq
        :since v1.0.0
        """
        Spider.urls = urls
        Spider.boot()

    @staticmethod
    def boot():
        """
        Boot Spider, set queue and crawled data.
        :return: None
        :author Muhammad Umer Farooq
        :since v1.0.0
        """
        Spider.queue = file_to_set(Spider.queue_file)
        Spider.crawled = file_to_set(Spider.crawled_file)

    @staticmethod
    def load_page(url: str) -> BeautifulSoup:
        """
        Load a page and return the HTML
        :param url: url
        :return: BeautifulSoup
        :author Muhammad Umer Farooq
        :since v1.0.0
        :exception HTTPError, Timeout
        """
        # Get the page.
        try:
            page = requests.get(url)
            # Return the HTML.
            return BeautifulSoup(page.text, 'html.parser')
        except (HTTPError, Timeout) as e:
            return None

    @staticmethod
    def crawl_page(thread_name, page_url):
        """
        Crawl the page and get the data.
        """
        if page_url in Spider.queue:
            print(thread_name + ' now crawling ' + page_url)
            page = Spider.load_page(page_url)
            if page:
                # Get latitude from URL.
                latitude, longitude = get_lat_long(
                    page_url)[0], get_lat_long(page_url)[1]
                city = get_by_lat_long(latitude, longitude)
                city = city[0]['name'] if city != [] else None

                # Get required data.
                currentCondition = _nullsfae(
                    page.find("div", {"class": "CurrentConditions--phraseValue--2Z18W"}))
                if city is None:
                    city = _nullsfae(
                        page.find('h1', {'class': 'CurrentConditions--location--kyTeL'}))
                temp = _nullsfae(
                    page.find('span', {'class': 'CurrentConditions--tempValue--3a50n'}))
                feelLikeTemp = _nullsfae(
                    page.find("span", {"class": "TodayDetailsCard--feelsLikeTempValue--Cf9Sl"}))
                details = page.find(
                    "div", {'class': 'TodayDetailsCard--detailsContainer--16Hg0'})
                wind = _nullsfae(details.find(
                    'span', {'class': 'Wind--windWrapper--3aqXJ'}))
                windDirection = ""
                try:
                    windDirection = page.find(
                        "span", {"class": "Wind--windWrapper--3aqXJ"}).find("svg")
                except:
                    pass
                uv_index = _nullsfae(details.find(
                    'span', {'data-testid': 'UVIndexValue'}))
                VisibilityValue = _nullsfae(details.find(
                    'span', {'data-testid': 'VisibilityValue'}))
                pressure = _nullsfae(details.find(
                    'span', {'data-testid': 'PressureValue'}))
                humidity = _nullsfae(details.find(
                    'span', {'data-testid': 'PercentageValue'}))
                _data = details.find_all(
                    "div", {"class": "WeatherDetailsListItem--wxData--2s6HT"})
                dewPoint = _nullsfae(_data[3].find(
                    'span', {'data-testid': 'TemperatureValue'}))
                moonPhase = _nullsfae(_data[-1])
                temps = _data[0].find_all(
                    'span', {'data-testid': 'TemperatureValue'})
                high = _nullsfae(temps[0])
                low = _nullsfae(temps[1])
                sunset = page.find(
                    'div', {'class': 'SunriseSunset--sunsetDateItem--34dPe'})
                sunset = _nullsfae(sunset.find('p')) if sunset else None
                sunrise = page.find(
                    'div', {'class': 'SunriseSunset--sunriseDateItem--3qqf7'})
                sunrise = _nullsfae(sunrise.find('p')) if sunrise else None
                airQuality = page.find(
                    'div', {'class': 'AirQuality--col--1TYtR'})
                airQualityNumber = _nullsfae(
                    airQuality.find("text")) if airQuality else None
                airQualityText = _nullsfae(
                    page.find("span", {"class": "AirQualityText--severity--1fu5k"}))
                airQualityDescription = _nullsfae(
                    page.find("p", {"class": "AirQualityText--severityText--1wT_O"}))

                # Refactor data.
                try:
                    temp = temp.replace("°", " c")
                    feelLikeTemp = feelLikeTemp.replace("°", " c")
                    low = low.replace("°", " c")
                    high = high.replace("°", " c")
                    pressure = pressure.replace("Arrow Down", "Down ")
                    wind = wind.replace(" Wind Direction", " ")
                except:
                    pass

                # Get current datetime.
                date = datetime.datetime.now()

                # Check If file is not exists.
                if not os.path.exists("data/weather.csv"):
                    # Create the file.
                    with open("data/weather.csv", "w") as fh:
                        fh.write("date,country,latitude,longitude,city,currentCondition,temp,feelLikeTemp,wind,Wind Directin,uv_index,VisibilityValue,pressure,humidity,dewPoint,moonPhase,high,low,sunset,sunrise,airQualityNumber,airQualityText,airQualityDescription\n")

                # append data to file.p
                with open("data/weather.csv", 'a') as f:
                    f.write(str(date)+","+"pakistan,"+latitude+","+longitude+","+city+","+currentCondition+","+temp+","+feelLikeTemp+","+wind+","+str(windDirection)+","+uv_index+","+VisibilityValue+"," +
                            pressure+","+humidity+","+dewPoint+","+moonPhase+","+high+","+low+","+sunset+","+sunrise+","+airQualityNumber+","+airQualityText+","+airQualityDescription+"\n")

                print("Data saved successfully.")

                Spider.queue.remove(page_url)
                Spider.crawled.add(page_url)
                Spider.updateFiles()

    @staticmethod
    def updateFiles():
        """
        Update queue and crawled files.
        :return None
        :author Muhammad Umer Farooq
        :since v1.0.0
        """
        set_to_file(Spider.queue, Spider.queue_file)
        set_to_file(Spider.crawled, Spider.crawled_file)
