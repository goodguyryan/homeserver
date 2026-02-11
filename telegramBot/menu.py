from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    CommandHandler,
    CallbackQueryHandler,
    ConversationHandler,
    ContextTypes,
)

from expenses import prompt_add_expense
from expenses import reply_this_month_total
from telegramBot.game import prompt_add_gamble, prompt_add_game
from telegramBot.game import reply_total_net_amount

MAIN_MENU, EXPENSES_MENU, GAMES_MENU= range(3)

CB_MAIN_EXPENSES = "main:expenses"
CB_MAIN_GAME = "main:game"

CB_EXP_ADD = "exp:add"
CB_EXP_THISMONTH = "exp:thismonth"
CB_EXP_BACK = "exp:back"

CB_GAME_ADD = "game:add"
CB_GAME_TOTAL = "game:total"
CB_GAME_BACK = "game:back"

CB_BACK_MAIN = "back:main"
CB_CLOSE = "ui:close"


def keyboard_main() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
            InlineKeyboardButton("Expenses", callback_data=CB_MAIN_EXPENSES),
            InlineKeyboardButton("Games", callback_data=CB_MAIN_GAME),
            ],
            [InlineKeyboardButton("Close", callback_data=CB_CLOSE)],
        ]
    )


def keyboard_expenses() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("Add", callback_data=CB_EXP_ADD),
                InlineKeyboardButton("This Month", callback_data=CB_EXP_THISMONTH),
            ],
            [InlineKeyboardButton("⬅ Back", callback_data=CB_BACK_MAIN)],
        ]
    )


def keyboard_games() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("Add", callback_data=CB_GAME_ADD),
                InlineKeyboardButton("Total", callback_data=CB_GAME_TOTAL),
            ],
            [InlineKeyboardButton("⬅ Back", callback_data=CB_BACK_MAIN)],
        ]
    )


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    _ = context
    await update.message.reply_text("What would you like to do?", reply_markup=keyboard_main())
    return MAIN_MENU

async def on_main_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    _=context
    query = update.callback_query
    await query.answer()

    if query.data == CB_MAIN_EXPENSES:
        await query.edit_message_text("Expenses: choose an action",
                                      reply_markup=keyboard_expenses())
        return EXPENSES_MENU

    if query.data == CB_MAIN_GAME:
        await query.edit_message_text("Games: choose an action",
                                      reply_markup=keyboard_games())
        return GAMES_MENU

    await query.edit_message_text("What would you like to do?", reply_markup=keyboard_main())
    return MAIN_MENU


async def on_back_to_main(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    _ = context
    query = update.callback_query
    await query.answer()
    await query.edit_message_text("What would you like to do?", reply_markup=keyboard_main())
    return MAIN_MENU


async def on_expenses_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()

    if query.data == CB_EXP_ADD:
        await prompt_add_expense(update, context)
        return EXPENSES_MENU

    if query.data == CB_EXP_THISMONTH:
        await reply_this_month_total(update, context)
        await query.edit_message_text("Menu closed. Type /start to open it again.")
        return EXPENSES_MENU

    if query.data == CB_BACK_MAIN:
        await query.edit_message_text("What would you like to do?", reply_markup=keyboard_main())
        return MAIN_MENU

    await query.edit_message_text("Expenses: choose an action", reply_markup=keyboard_expenses())
    return EXPENSES_MENU

async def on_game_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()

    if query.data == CB_GAME_ADD:
        await prompt_add_game(update, context)
        return GAMES_MENU

    if query.data == CB_GAME_TOTAL:
        await reply_total_net_amount(update, context)
        await query.edit_message_text("Menu closed. Type /start to open it again.")
        return GAMES_MENU

    if query.data == CB_GAME_BACK:
        await query.edit_message_text("What would you like to do?", reply_markup=keyboard_main())
        return MAIN_MENU

    await query.edit_message_text("Games: choose an action", reply_markup=keyboard_games())
    return GAMES_MENU

async def close_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    _ = context
    query = update.callback_query
    await query.answer()
    await query.edit_message_text("Menu closed. Type /start to open it again.")
    return ConversationHandler.END

def build_menu_conversation() -> ConversationHandler:
    return ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            MAIN_MENU: [
                CallbackQueryHandler(close_menu, pattern=r"^ui:close$"),
                CallbackQueryHandler(on_main_choice, pattern=r"^main:"),
            ],
            EXPENSES_MENU: [
                CallbackQueryHandler(on_expenses_choice, pattern=r"^(exp:|back:main)"),
            ],
            GAMES_MENU: [
                CallbackQueryHandler(on_game_choice, pattern=r"^(game:|back:main)"),
            ],
        },
        fallbacks=[CommandHandler("start", start)],
        allow_reentry=True,
    )
