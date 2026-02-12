import os
import datetime
import psycopg
from psycopg.rows import dict_row
from telegram import Update
from telegram.ext import (
    Application,
    ContextTypes,
    MessageHandler,
    filters,
)
DATABASE_URL = os.environ.get("DATABASE_URL")
WAITING_FOR_GAME_INPUT = "waiting_for_game_input"

def get_db_connection():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)

def parse_game_text(text: str) -> tuple[str, float]:
    text = (text or "").strip()
    if not text:
        raise ValueError("Empty input")

    parts = text.split()
    if len(parts) < 2:
        raise ValueError("Need game and net_amount")

    game = " ".join(parts[:-1])
    amount_str = parts[-1]
    try:
        net_amount = round(float(amount_str), 2)
    except ValueError as e:
        raise ValueError("Net amount must be a number") from e

    return game, net_amount

def insert_game(game: str, net_amount: float) -> None:
    today = datetime.datetime.now().date()
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO games (game, net_amount, month, year) " \
                "VALUES (%s, %s, %s, %s)",
                (game, net_amount, today.month, today.year),
            )
        conn.commit()

async def prompt_add_game(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    context.user_data[WAITING_FOR_GAME_INPUT] = True
    await query.edit_message_text(
        "What game would you like to add?\n\nType: <game> <net_amount>\nExample: poker 10.50"
    )

async def handle_typed_game_if_waiting(update: Update,
                                          context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.user_data.get(WAITING_FOR_GAME_INPUT):
        return

    text = (update.message.text or "").strip()
    try:
        game, net_amount = parse_game_text(text)
    except ValueError as e:
        await update.message.reply_text(
            f"Invalid format: {e}\n\nPlease type: <game> <net_amount>\nExample: poker 10.50"
        )
        return

    insert_game(game, net_amount)
    context.user_data[WAITING_FOR_GAME_INPUT] = False
    await update.message.reply_text(f"Added game: {game}: ${net_amount:.2f}")

def fetch_all_net_amount() -> list[dict]:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT net_amount FROM games")
            return cur.fetchall()

def compute_total_net_amount() -> float:
    net_amounts = fetch_all_net_amount()
    return float(sum(n["net_amount"] for n in net_amounts))

async def reply_total_net_amount(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    _ = context
    query = update.callback_query
    total = compute_total_net_amount()
    await query.message.reply_text(f"Total net amount from games: ${total:.2f}")

def register_game_commands(application: Application) -> None:
    application.add_handler(
    MessageHandler(filters.TEXT & ~filters.COMMAND, handle_typed_game_if_waiting),
    group=2
    )
