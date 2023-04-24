import gql from 'graphql-tag';

export const pairInfoQuery = gql`
query GetPairHourDatas($fromHoursAgo: Int!) {
  pairHourDatas(
    where: { pair: "PAIR_ADDRESS_PLACEHOLDER" }
    orderBy: hourStartUnix
    orderDirection: desc
    first: $fromHoursAgo
  ) {
    pair {
      id
      token0 {
        name
        symbol
      }
      token1 {
        name
        symbol
      }
    }
    hourlyVolumeToken0
    hourlyVolumeToken1
    hourlyVolumeUSD
    reserve0
    reserve1
    reserveUSD
  }
}
`;