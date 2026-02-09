from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, filters, MessageHandler
from dotenv import load_dotenv
import os

load_dotenv()
TOKEN = os.getenv("TOKEN")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Hello! I am your bot.")

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

async def caps(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text_caps = ' '.join(context.args).upper()
    await context.bot.send_message(chat_id=update.effective_chat.id, text=text_caps)

async def unknown(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Sorry, I didn't understand that command.")

def startBot():
    application = Application.builder().token(TOKEN).build()

    startHandler = CommandHandler('start', start)
    echoHandler = MessageHandler(filters.TEXT & (~filters.COMMAND), echo)
    capsHandler = CommandHandler('caps', caps)
    unknownHandler = MessageHandler(filters.COMMAND, unknown)
   
    application.add_handler(startHandler)
    application.add_handler(echoHandler)
    application.add_handler(capsHandler)
    application.add_handler(unknownHandler)

    application.run_polling()

if __name__ == "__main__":
    startBot()