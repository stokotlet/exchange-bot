import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { CurrencyBot } from "./controller/controller";
import { ListenCurrency } from "./commands/listen-currency";
import { GetPair } from "./commands/get-pair";
import { ListenStart } from "./commands/listen-start";

const token = process.env.TELEGRAM_TOKEN || "";

const bot = new TelegramBot(token, { polling: true });

const getPairCommand = new GetPair(bot);
const listenCurrencyCommand = new ListenCurrency(bot, getPairCommand);
const listenStartCommand = new ListenStart(bot);

const currencyBot = new CurrencyBot();

currencyBot.addCommand(listenStartCommand);
currencyBot.addCommand(listenCurrencyCommand);

currencyBot.executeCommands();
