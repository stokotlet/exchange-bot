import TelegramBot from "node-telegram-bot-api";
import { Command } from "../model/command";
import { Message } from "node-telegram-bot-api";
import { Api } from "../api/api";
import { UNKNOWN_ERROR_MESSAGE, getCurrencyMessage } from "../model/messages";

export class GetPair extends Command {
  private readonly bot: TelegramBot;
  private readonly currencyPairRegexp = /^[a-zA-Z]{3}-[a-zA-Z]{3}$/;
  private readonly getCurrencyCommandRegexp = /\/currency/;

  constructor(bot: TelegramBot) {
    super();
    this.bot = bot;
  }
  execute = () => {
    this.bot.once("message", async (msg: Message) => {
      if (!msg.text) {
        return;
      }

      const chatId = msg.chat.id;
      const isCurrencyPair = this.currencyPairRegexp.test(msg.text);
      const isCurrencyCommand = this.getCurrencyCommandRegexp.test(msg.text);

      if (isCurrencyCommand) {
        return;
      }

      if (!isCurrencyPair) {
        console.error("Unknown currency pair");

        return this.bot.sendMessage(chatId, UNKNOWN_ERROR_MESSAGE);
      }

      const [firstCurrency, secondCurrency] = msg.text.split("-");

      const params = {
        from: firstCurrency,
        to: secondCurrency,
      };

      try {
        const { data } = await Api.fetchExchangePair(params);

        const { base_code, target_code, conversion_rate } = data;

        this.bot.sendMessage(
          chatId,
          getCurrencyMessage({
            from: base_code,
            to: target_code,
            rate: conversion_rate.toFixed(2),
          }),
        );
      } catch (err) {
        console.error(err);

        this.bot.sendMessage(chatId, UNKNOWN_ERROR_MESSAGE);
      }
    });
  };
}
