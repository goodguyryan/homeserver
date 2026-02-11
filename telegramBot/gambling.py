from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)

async def return_gambling(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    _=context
    await update.message.reply_text("Gambling functionality is not yet implemented.")

def register_gambling_commands(application: Application) -> None:
    application.add_handler(CommandHandler("gambling", return_gambling))
