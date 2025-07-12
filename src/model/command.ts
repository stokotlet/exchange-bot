export abstract class Command {
  abstract execute(id?: number, message?: string): void;
}
