import { Bot } from "grammy";
import { config } from "dotenv";
import * as handlers from "./handlers";
import express from "express";

const app = express();

app.get("/", (req, res) => {
   res.send("Hello world");
});

const port = 3000;

app.listen(port, () => {
   console.log(`Listening on port: (${port})`);
});

config();

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command("start", handlers.start);
bot.command("help", handlers.help);
bot.command("id", handlers.id);
bot.command("bot_id", handlers.botId);
bot.command("chat_id", handlers.chatId);
bot.command("token", handlers.token);
bot.command("all", handlers.all)

bot.start();

console.log("Bot Started");
