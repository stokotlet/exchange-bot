import { axiosInstance } from "./axios";
import { IConvert, IQuery } from "./interfaces";

export class Api {
  static baseUrl = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}`;

  static fetchExchangePair = (params: IQuery) => {
    return axiosInstance.get<IConvert>(
      `${this.baseUrl}/pair/${params.from}/${params.to}`,
    );
  };
}
