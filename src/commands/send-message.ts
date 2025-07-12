import TelegramBot from "node-telegram-bot-api";
import { Command } from "../model/command";

export class SendMessage extends Command {
  private readonly bot: TelegramBot;
  constructor(bot: TelegramBot) {
    super();
    this.bot = bot;
  }
  execute = (id: number, message: string) => {
    this.bot.sendMessage(id, message);
  };
}
