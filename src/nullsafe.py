"""nullsafe.py NullSafe helper file."""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.0"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"


def _nullsfae(obj):
    """
    Return None if not None
    :param obj The object
    :rturn str | none
    :author Muhammad Umer Farooq
    :since v.1.0.0
    """
    return obj.text if obj else None
