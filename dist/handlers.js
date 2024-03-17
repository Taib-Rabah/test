"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.token = exports.chatId = exports.botId = exports.id = exports.help = exports.start = void 0;
const grammy_1 = require("grammy");
const utils = __importStar(require("./utils"));
const cons = __importStar(require("./constants"));
function start(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.reply("Hello and welcome!\n\nType /help if you need help");
    });
}
exports.start = start;
function help(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield ctx.reply(message);
    });
}
exports.help = help;
const MD = "MarkdownV2";
function id(ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        const message = id ? utils.wrap(id, "`") : "I don't know who you are!";
        yield ctx.reply(message, { parse_mode: MD });
    });
}
exports.id = id;
function botId(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (yield ctx.api.getMe()).id;
        const message = utils.wrap(id, "`");
        yield ctx.reply(message, { parse_mode: MD });
    });
}
exports.botId = botId;
function chatId(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = ctx.chat.id;
        const message = utils.wrap(id, "`");
        yield ctx.reply(message, { parse_mode: MD });
    });
}
exports.chatId = chatId;
function token(ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const isOwner = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id) === cons.ownerId;
        const message_id = ctx.message.message_id;
        if (!isOwner) {
            const message = "I can't give you the bot token! You are not the owner";
            yield ctx.reply(message, { reply_parameters: { message_id } });
        }
        else {
            const token = utils.wrap(process.env.BOT_TOKEN, "`");
            if (ctx.chat.type !== "private") {
                const title = "Open Private Chat";
                const url = "https://t.me/learn1014_bot";
                const reply_markup = new grammy_1.InlineKeyboard().url(title, url);
                const message = "I have sent you the token in private";
                const reply_parameters = { message_id };
                yield ctx.reply(message, { reply_markup, reply_parameters });
                yield ctx.api.sendMessage(cons.ownerId, token, { parse_mode: MD });
            }
            else {
                yield ctx.reply(token, { parse_mode: MD });
            }
        }
    });
}
exports.token = token;
function all(ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        userId = userId ? utils.wrap(userId, "`") : "Unknown";
        const botId = utils.wrap((yield ctx.api.getMe()).id, "`");
        const chatId = utils.wrap(ctx.chat.id, "`");
        const message = `Your ID: ${userId}\nBot ID: ${botId}\nChat ID: ${chatId}`;
        ctx.reply(message, { parse_mode: MD });
    });
}
exports.all = all;
