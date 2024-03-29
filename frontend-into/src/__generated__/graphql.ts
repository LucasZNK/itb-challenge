/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Pair = {
  __typename?: "Pair";
  address: Scalars["String"];
  id: Scalars["Int"];
  snapshotPairData: Array<SnapshotPairData>;
  token0: Token;
  token1: Token;
};

export type PairSnapshotFilterDto = {
  endDate?: InputMaybe<Scalars["String"]>;
  lastSnapshotsFromNow?: InputMaybe<Scalars["Float"]>;
  pairAddress: Scalars["String"];
  startDate?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  getPairSnapshotsByDateRange: Array<SnapshotPairData>;
};

export type QueryGetPairSnapshotsByDateRangeArgs = {
  pairSnapshotFilter: PairSnapshotFilterDto;
};

export type SnapshotPairData = {
  __typename?: "SnapshotPairData";
  hourlyPairFees: Scalars["Float"];
  hourlyVolumeToken0: Scalars["Float"];
  hourlyVolumeToken1: Scalars["Float"];
  hourlyVolumeUSD: Scalars["Float"];
  id: Scalars["Float"];
  pair: Pair;
  reserve0: Scalars["Float"];
  reserve1: Scalars["Float"];
  reserveUSD: Scalars["Float"];
  timestamp: Scalars["DateTime"];
};

export type Token = {
  __typename?: "Token";
  name: Scalars["String"];
  symbol: Scalars["String"];
};
