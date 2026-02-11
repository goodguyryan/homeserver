from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    CommandHandler,
    CallbackQueryHandler,
    ConversationHandler,
    ContextTypes,
)

from expenses import prompt_add_expense
from expenses import reply_this_month_total

MAIN_MENU, EXPENSES_MENU, GAMBLING_MENU= range(3)

CB_MAIN_EXPENSES = "main:expenses"
CB_MAIN_GAMBLING = "main:gambling"

CB_EXP_ADD = "exp:add"
CB_EXP_THISMONTH = "exp:thismonth"
CB_EXP_BACK = "exp:back"

CB_GAMBLING_BACK = "gambling:back"

CB_BACK_MAIN = "back:main"
CB_CLOSE = "ui:close"


def keyboard_main() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
            InlineKeyboardButton("Expenses", callback_data=CB_MAIN_EXPENSES),
            InlineKeyboardButton("Gambling", callback_data=CB_MAIN_GAMBLING),
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


def keyboard_gambling() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [[InlineKeyboardButton("⬅ Back", callback_data=CB_BACK_MAIN)]]
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

    if query.data == CB_MAIN_GAMBLING:
        await query.edit_message_text("Gambling: not implemented yet.",
                                      reply_markup=keyboard_gambling())
        return GAMBLING_MENU

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
        await query.edit_message_text("Thank you!")
        return EXPENSES_MENU

    if query.data == CB_BACK_MAIN:
        await query.edit_message_text("What would you like to do?", reply_markup=keyboard_main())
        return MAIN_MENU

    await query.edit_message_text("Expenses: choose an action", reply_markup=keyboard_expenses())
    return EXPENSES_MENU

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
            GAMBLING_MENU: [
                CallbackQueryHandler(on_back_to_main, pattern=r"^back:main$"),
            ],
        },
        fallbacks=[CommandHandler("start", start)],
        allow_reentry=True,
    )
