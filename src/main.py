"""main.py Base"""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.0"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"

from data.data import cities
import os
import threading
from queue import Queue
from Spider import Spider
from helper import *
from Notification import Notification
import datetime

# Number of threads.
NO_OF_THREADS = 4

# Base URL
base_url = "https://weather.com/weather/today/l/"

# Create file crawled.txt.
with open("crawled.txt", "w") as f:
    pass

os.remove("data/latest.csv")
with open("data/latest.csv", "w") as fh:
    fh.write("date,country,latitude,longitude,city,currentCondition,temp,feelLikeTemp,wind,Wind Directin,uv_index,VisibilityValue,pressure,humidity,dewPoint,moonPhase,high,low,sunset,sunrise,airQualityNumber,airQualityText,airQualityDescription\n")

# urls to file.
with open('queue.txt', 'w') as f:
    for city in cities:
        f.write(base_url + city['lat'] + ',' + city['lng'] + "?unit=c" + "\n")

queue = Queue()
Spider("weather.com")


def workers():
    """
    Create worker threads.
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    for _ in range(NO_OF_THREADS):
        t = threading.Thread(target=work)
        t.daemon = True
        t.start()


def work():
    """
    Do the next job in the queue.
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    while True:
        url = queue.get()
        Spider.crawl_page(threading.current_thread().name, url)
        queue.task_done()


def jobs():
    """
    Load queue and start crawling.
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    for link in file_to_set("queue.txt"):
        queue.put(link)

    queue.join()
    crawl()


def crawl():
    """
    Check if there are items in the queue, if so crawl them.
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    queued_links = file_to_set("queue.txt")
    if len(queued_links) > 0:
        print(str(len(queued_links)) + ' links in the queue')
        jobs()
    else:
        print("No more links in the queue")
        print("Done")
        # remove queue.txt and crawled.txt
        os.remove("queue.txt")
        os.remove("crawled.txt")
        # Notification.email(
        #     os.environ['EMAIL'],
        #     "Pak Weather Notification" + " " + str(datetime.now()),
        #     "Weather data has been crawled successfully."
        # )


def pak_weather():
    """
    Main function.
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    workers()
    crawl()


pak_weather()
