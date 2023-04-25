import { gql, useQuery } from '@apollo/client';

export const GET_SNAPSHOT = gql`
  query GetPairSnapshotsByDateRange($pairAddress: String!) {
    getPairSnapshotsByDateRange(
      pairSnapshotFilter: {
        pairAddress: $pairAddress,
        lastSnapshotsFromNow: 1
      }
    ) {
      id
      pair {
        id
        address
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      hourlyVolumeToken0
      hourlyVolumeToken1
      hourlyVolumeUSD
      reserve0
      reserve1
      reserveUSD
      timestamp
    }
  }
`;
