import os
from dotenv import load_dotenv
from telegram.ext import Application

from menu import build_menu_conversation
from expenses import register_expense_commands
from telegramBot.gambling import register_gambling_commands

load_dotenv()
TOKEN = os.getenv("TOKEN")

def start_bot() -> None:
    application = Application.builder().token(TOKEN).build()
    application.add_handler(build_menu_conversation())
    register_expense_commands(application)
    register_gambling_commands(application)
    application.run_polling()

if __name__ == "__main__":
    start_bot()
