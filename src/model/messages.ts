import { ICurrencyMessageProps } from "./interfaces";

export const UNKNOWN_ERROR_MESSAGE =
  "Ой! Что-то пошло не так. Убедись, что ввел валютную пару в формате USD-EUR, или попробуй позже.";

export const getCurrencyMessage = ({ from, to, rate }: ICurrencyMessageProps) =>
  `Текущий курс ${from} к ${to}: ${rate}`;
