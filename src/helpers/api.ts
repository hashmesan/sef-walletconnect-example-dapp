import axios, { AxiosInstance } from "axios";
import { IAssetData, IGasPrices, IParsedTx } from "./types";
import Web3 from "web3";
import {getChainData} from "./utilities";

const api: AxiosInstance = axios.create({
  baseURL: "https://ethereum-api.xyz",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function apiGetAccountAssets(address: string, chainId: number): Promise<IAssetData[]> {
  // const response = await api.get(`/account-assets?address=${address}&chainId=${chainId}`);
  // const { result } = response.data;
  // return result;
  const chainData = getChainData(chainId);
  const web3 = new Web3(new Web3.providers.HttpProvider(chainData.rpc_url));
  const balance = await web3.eth.getBalance(address)
  return [{
    symbol: "ONE",
    decimals: "18",
    name: "Harmony",
    contractAddress: "",
    balance
  }]
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number,
): Promise<IParsedTx[]> {
  // const response = await api.get(`/account-transactions?address=${address}&chainId=${chainId}`);
  // const { result } = response.data;
  // return result;
  return []
}

// relayer handles NONCE
export const apiGetAccountNonce = async (address: string, chainId: number): Promise<string> => {
  return "0"
};

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const response = await api.get(`/gas-prices`);
  const { result } = response.data;
  return result;
};
