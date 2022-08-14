"""notification.py Sent email notification."""
__author__ = "Muhammad Umer Farooq"
__license__ = "MIT"
__version__ = "1.0.0"
__maintainer__ = "Muhammad Umer Farooq"
__email__ = "umer@lablnet.com"
__status__ = "Production"

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class Notification:

    @staticmethod
    def email(receiver: str, subject: str, message: str) -> None:
        """
        Send email notification.
        :param receiver: email address
        :param subject: email subject
        :param message: email message
        :return: None
        :author Muhammad Umer Farooq
        :since v1.0.0
        """
        s = smtplib.SMTP(host=os.environ("SMTP_HOST"),
                         port=os.environ("SMTP_PORT"))
        s.starttls()
        s.login(os.environ("SMTP_USER"), os.environ("SMTP_PASS"))
        msg = MIMEMultipart()
        msg['From'] = os.environ("SMTP_USER")
        msg['To'] = receiver
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'html'))
        s.send_message(msg)
