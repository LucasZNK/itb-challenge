export function buildPairDataQuery(pair) {
  return `
      query getPairInfo($first: Int!){
        pairHourDatas(first: $first, orderBy: hourStartUnix, orderDirection: desc, where: {pair: "${pair}"}) {
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
}
