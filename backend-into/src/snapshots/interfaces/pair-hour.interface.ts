export interface IToken {
  name: string;
}

export interface IPair {
  token0: IToken;
  token1: IToken;
}

export interface IPairHourData {
  pair: IPair;
  hourlyVolumeToken0: string;
  hourlyVolumeToken1: string;
  hourlyVolumeUSD: string;
  reserve0: string;
  reserve1: string;
  reserveUSD: string;
}

export interface IPairHourDatasResponse {
  pairHourDatas: IPairHourData[];
}
