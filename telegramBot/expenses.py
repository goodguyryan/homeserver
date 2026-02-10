import os
import datetime
import psycopg
from psycopg.rows import dict_row
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

DATABASE_URL = os.environ.get("DATABASE_URL")
WAITING_FOR_EXPENSE_INPUT = "waiting_for_expense_input"

def get_db_connection():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)

def parse_expense_text(text: str) -> tuple[str, float]:
    text = (text or "").strip()
    if not text:
        raise ValueError("Empty input")

    parts = text.split()
    if len(parts) < 2:
        raise ValueError("Need description and amount")

    description = " ".join(parts[:-1])
    amount_str = parts[-1]
    try:
        amount = round(float(amount_str), 2)
    except ValueError as e:
        raise ValueError("Amount must be a number") from e

    if amount < 0:
        raise ValueError("Amount must be non-negative")

    return description, amount


def insert_expense(description: str, amount: float) -> None:
    today = datetime.datetime.now().date()
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO expenses (description, amount, day, month, year) VALUES (%s, %s, %s, %s, %s)",
                (description, amount, today.day, today.month, today.year),
            )
        conn.commit()


def fetch_month_expenses(month: int, year: int) -> list[dict]:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT description, amount FROM expenses WHERE month = %s AND year = %s",
                (month, year),
            )
            return cur.fetchall()


def compute_month_total(month: int, year: int) -> float:
    expenses = fetch_month_expenses(month, year)
    return float(sum(e["amount"] for e in expenses))

async def prompt_add_expense(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    context.user_data[WAITING_FOR_EXPENSE_INPUT] = True
    await query.edit_message_text(
        "What expense would you like to add?\n\nType: <description> <amount>\nExample: lunch 5.50"
    )


async def reply_this_month_total(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    _ = context
    query = update.callback_query

    today = datetime.datetime.now().date()
    total = compute_month_total(today.month, today.year)
    await query.message.reply_text(f"Total monthly expenses: ${total:.2f}")


async def handle_typed_expense_if_waiting(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.user_data.get(WAITING_FOR_EXPENSE_INPUT):
        return

    text = (update.message.text or "").strip()

    try:
        description, amount = parse_expense_text(text)
    except ValueError as e:
        await update.message.reply_text(
            f"Invalid format: {e}\n\nPlease type: <description> <amount>\nExample: lunch 5.50"
        )
        return

    insert_expense(description, amount)
    context.user_data[WAITING_FOR_EXPENSE_INPUT] = False
    await update.message.reply_text(f"Added expense: {description}: ${amount:.2f}")

def register_expense_commands(application: Application) -> None:
    application.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, handle_typed_expense_if_waiting)
    )
