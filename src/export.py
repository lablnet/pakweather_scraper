"""export.py is a file for exporting data."""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.1"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"


import argparse
from helper import make_json

VALID_TYPES = ['js']

parser = argparse.ArgumentParser(
    prog="export.py", description='Export a file to a different format.')
# Add argument to get export file type
parser.add_argument('type', type=str, metavar='export_type',
                    help='The type of file to export to.', action='store')

# get the arguments
t = parser.parse_args().type

# Check if the type is valid
if t in VALID_TYPES:
    print("Exporting to " + t)
    # Export to JavaScript.
    make_json("data/latest.csv", "data/weather.js", "weather")
    print("Done")
else:
    print("Invalid export type")
    # Exit with error code 1
    exit(1)
