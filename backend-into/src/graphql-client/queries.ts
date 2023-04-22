export const pairInfoQuery = `
query GetPairHourDatas($fromHoursAgo: Int!) {
  pairHourDatas(
    where: { pair: addressPair}
    orderBy: hourStartUnix
    orderDirection: desc
    first: $fromHoursAgo
  ) {
    pair {
      token0 {
        name
      }
      token1 {
        name
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
