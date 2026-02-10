from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    CommandHandler,
    CallbackQueryHandler,
    ConversationHandler,
    ContextTypes,
)

MAIN_MENU, EXPENSES_MENU, GPA_MENU = range(3)

CB_MAIN_EXPENSES = "main:expenses"
CB_MAIN_GPA = "main:gpa"

CB_EXP_ADD = "exp:add"
CB_EXP_THISMONTH = "exp:thismonth"
CB_EXP_BACK = "exp:back"

CB_GPA_BACK = "gpa:back"

CB_BACK_MAIN = "back:main"


def kb_main() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [[
            InlineKeyboardButton("GPA", callback_data=CB_MAIN_GPA),
            InlineKeyboardButton("Expenses", callback_data=CB_MAIN_EXPENSES),
        ]]
    )


def kb_expenses() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("Add", callback_data=CB_EXP_ADD),
                InlineKeyboardButton("This Month", callback_data=CB_EXP_THISMONTH),
            ],
            [InlineKeyboardButton("⬅ Back", callback_data=CB_BACK_MAIN)],
        ]
    )


def kb_gpa() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [[InlineKeyboardButton("⬅ Back", callback_data=CB_BACK_MAIN)]]
    )


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    _ = context
    await update.message.reply_text("What would you like to do?", reply_markup=kb_main())
    return MAIN_MENU


async def on_main_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()

    if query.data == CB_MAIN_EXPENSES:
        await query.edit_message_text("Expenses: choose an action", reply_markup=kb_expenses())
        return EXPENSES_MENU

    if query.data == CB_MAIN_GPA:
        await query.edit_message_text("GPA: not implemented yet.", reply_markup=kb_gpa())
        return GPA_MENU

    await query.edit_message_text("What would you like to do?", reply_markup=kb_main())
    return MAIN_MENU


async def on_back_to_main(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    _ = context
    query = update.callback_query
    await query.answer()
    await query.edit_message_text("What would you like to do?", reply_markup=kb_main())
    return MAIN_MENU


async def on_expenses_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()

    if query.data == CB_EXP_ADD:
        from expenses import prompt_add_expense
        await prompt_add_expense(update, context)
        return EXPENSES_MENU

    if query.data == CB_EXP_THISMONTH:
        from expenses import reply_this_month_total
        await reply_this_month_total(update, context)
        await query.message.reply_text("Expenses: choose an action", reply_markup=kb_expenses())
        return EXPENSES_MENU

    if query.data == CB_BACK_MAIN:
        await query.edit_message_text("What would you like to do?", reply_markup=kb_main())
        return MAIN_MENU

    await query.edit_message_text("Expenses: choose an action", reply_markup=kb_expenses())
    return EXPENSES_MENU


def build_menu_conversation() -> ConversationHandler:
    return ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            MAIN_MENU: [
                CallbackQueryHandler(on_main_choice, pattern=r"^main:"),
            ],
            EXPENSES_MENU: [
                CallbackQueryHandler(on_expenses_choice, pattern=r"^(exp:|back:main)"),
            ],
            GPA_MENU: [
                CallbackQueryHandler(on_back_to_main, pattern=r"^back:main$"),
            ],
        },
        fallbacks=[CommandHandler("start", start)],
        allow_reentry=True,
    )
