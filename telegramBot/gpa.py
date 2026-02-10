from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)

async def return_gpa(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    _=context
    await update.message.reply_text("GPA functionality is not yet implemented.")

def register_gpa_commands(application: Application) -> None:
    application.add_handler(CommandHandler("gpa", return_gpa))
