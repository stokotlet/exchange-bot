import TelegramBot from "node-telegram-bot-api";
import { Command } from "../model/command";
import { Message } from "node-telegram-bot-api";

export class ListenStart extends Command {
  private readonly bot: TelegramBot;
  private readonly message =
    "Привет! Я помогу тебе узнать текущие курсы валют. Напиши /currency для получения списка доступных валют.";

  constructor(bot: TelegramBot) {
    super();
    this.bot = bot;
  }
  execute = () => {
    this.bot.onText(/\/start/, (msg: Message) => {
      const chatId = msg.chat.id;

      this.bot.sendMessage(chatId, this.message);
    });
  };
}
