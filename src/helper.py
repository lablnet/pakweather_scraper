"""helper.py is a helper file for main.py."""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.0"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"


import datetime


def get_datetime() -> datetime:
    """
    Get the datetime of GMT+5.
    :return: datetime
    :author Muhammad Umer Farooq
    :since v1.0.1
    """
    return datetime.datetime.now(tz=datetime.timezone(datetime.timedelta(hours=5)))


def get_lat_long(url: str) -> tuple:
    """
    Get Latitude and Longitude from given URL.
    :param url: URL
    :return: tuple
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    latlong = url.split("/")[6].split(",")
    return (latlong[0].strip(), latlong[1].replace("?unit=c", '').strip())


def append_to_file(file: str, data: str) -> None:
    """
    Append data to file.
    :param file: file name
    :param data: data to append
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    with open(file, 'a') as f:
        f.write(data + '\n')


def delete_from_file(file: str) -> None:
    """
    Delete file.
    :param file: file name
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    with open(file, 'w'):
        pass


def file_to_set(file: str) -> set:
    """
    File to set.
    :param file: file name
    :return: set
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    s = set()
    with open(file, 'r') as f:
        for line in f:
            s.add(line.replace('\n', ''))
    return s


def set_to_file(s: set, file: str) -> None:
    """
    Set to file.
    :param s: set
    :param file: file name
    :return: None
    :author Muhammad Umer Farooq
    :since v1.0.0
    """
    delete_from_file(file)
    for item in sorted(s):
        append_to_file(file, item)
