import TelegramBot from "node-telegram-bot-api";
import { Command } from "../model/command";
import { Message } from "node-telegram-bot-api";

export class ListenCurrency extends Command {
  private readonly message: string =
    "Введи валютную пару в формате USD-EUR, чтобы узнать курс обмена.";
  private readonly getCurrencyCommandRegexp = /\/currency/;

  constructor(
    private readonly bot: TelegramBot,
    private readonly getPairCommand: Command,
  ) {
    super();
    this.bot = bot;
    this.getPairCommand = getPairCommand;
  }

  execute = () => {
    this.bot.onText(this.getCurrencyCommandRegexp, (msg: Message) => {
      const chatId = msg.chat.id;

      this.bot.sendMessage(chatId, this.message);

      this.getPairCommand.execute();
    });
  };
}
