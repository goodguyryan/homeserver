import os
from dotenv import load_dotenv
from expenses import expense_handlers
from gpa import gpa_handlers
from telegram.ext import Application

load_dotenv()
TOKEN = os.getenv("TOKEN")

def start_bot() -> None:
    application = Application.builder().token(TOKEN).build()
    expense_handlers(application)
    gpa_handlers(application)
    application.run_polling()

if __name__ == "__main__":
    start_bot()
