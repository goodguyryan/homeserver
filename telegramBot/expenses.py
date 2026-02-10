import os
import datetime
import psycopg
from psycopg.rows import dict_row
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
)

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_db_connection():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Welcome to the Expenses Bot! Use /add to add an expense.")

async def add_expense(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args or len(context.args) < 2:
        await update.message.reply_text("Usage: /add <description> <amount>")
        return
    description = " ".join(context.args[:-1])
    amount = float(context.args[-1])
    day = datetime.datetime.now().date().day
    month = datetime.datetime.now().date().month
    year = datetime.datetime.now().date().year

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO expenses (description, amount, " \
                "day, month, year) VALUES (%s, %s, %s, %s, %s)",
                (description, amount, day, month, year),
            )
        conn.commit()
    await update.message.reply_text(f"Added expense: {description}: ${amount:.2f}")

async def see_total_monthly_expenses(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    month = datetime.datetime.now().date().month
    year = datetime.datetime.now().date().year
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT description, amount FROM expenses WHERE month = %s AND year = %s",
                (month, year),
            )
            expenses = cur.fetchall()
            total = sum(expense["amount"] for expense in expenses)
            await update.message.reply_text(f"Total monthly expenses: ${total:.2f}")

def expense_handlers(application: Application) -> None:
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("add", add_expense))
    application.add_handler(CommandHandler("total", see_total_monthly_expenses))
