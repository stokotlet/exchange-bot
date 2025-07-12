import { Command } from "../model/command";

export class CurrencyBot {
  commandList: Command[] = [];

  addCommand = (command: Command) => {
    this.commandList.push(command);
  };

  executeCommands = () => {
    this.commandList.forEach((command) => {
      command.execute();
    });
  };
}
