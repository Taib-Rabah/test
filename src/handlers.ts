import { CommandContext, Context, InlineKeyboard, Keyboard } from "grammy";
import * as utils from "./utils";
import * as cons from "./constants";
import { InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyParameters } from "grammy/types";

export async function start(ctx: CommandContext<Context>) {
   await ctx.reply("Hello and welcome!\n\nType /help if you need help");
}

export async function help(ctx: CommandContext<Context>) {
   const messageParts = [
      "Available commands:",
      "",
      "/start - Start the bot",
      "/help - Help message",
      "/id - Get your id",
      "/bot_id- Get the bot id",
      "/chat_id - Get the chat id",
      "/token - Get the bot token (only for owner)",
      "/all - Get the result of (/id | /bot_id | /chat_id)"
   ];
   const message = messageParts.join("\n");
   await ctx.reply(message);
}

const MD = "MarkdownV2";

export async function id(ctx: CommandContext<Context>) {
   const id = ctx.from?.id;
   const message = id ? utils.wrap(id, "`") : "I don't know who you are!";
   await ctx.reply(message, { parse_mode: MD });
}

export async function botId(ctx: CommandContext<Context>) {
   const id = (await ctx.api.getMe()).id;
   const message = utils.wrap(id, "`");
   await ctx.reply(message, { parse_mode: MD });
}

export async function chatId(ctx: CommandContext<Context>) {
   const id = ctx.chat.id;
   const message = utils.wrap(id, "`");
   await ctx.reply(message, { parse_mode: MD });
}

export async function token(ctx: CommandContext<Context>) {
   const isOwner = ctx.from?.id === cons.ownerId;
   const message_id = ctx.message!.message_id;
   if (!isOwner) {
      const message = "I can't give you the bot token! You are not the owner";
      await ctx.reply(message, { reply_parameters: { message_id } });
   } else {
      const token = utils.wrap(process.env.BOT_TOKEN!, "`");
      if (ctx.chat.type !== "private") {
         const title = "Open Private Chat";
         const url = "https://t.me/learn1014_bot";
         const reply_markup: InlineKeyboardMarkup = new InlineKeyboard().url(title, url);
         const message = "I have sent you the token in private";
         const reply_parameters: ReplyParameters = { message_id };
         await ctx.reply(message, { reply_markup, reply_parameters });
         await ctx.api.sendMessage(cons.ownerId, token, { parse_mode: MD });
      } else {
         await ctx.reply(token, { parse_mode: MD });
      }
   }
}

export async function all(ctx: CommandContext<Context>) {
   let userId: any = ctx.from?.id;
   userId = userId ? utils.wrap(userId, "`") : "Unknown";
   const botId = utils.wrap((await ctx.api.getMe()).id, "`");
   const chatId = utils.wrap(ctx.chat.id, "`");
   const message = `Your ID: ${userId}\nBot ID: ${botId}\nChat ID: ${chatId}`;
   ctx.reply(message, { parse_mode: MD });
}
