import { gql } from '@apollo/client';
// import { gql } from '../../../__generated__/gql';

export const GET_SNAPSHOT = gql(/* GraphQL */`
  query GetPairSnapshotsByDateRange($pairSnapshotFilter: PairSnapshotFilterDto!) {
    getPairSnapshotsByDateRange(
      pairSnapshotFilter: $pairSnapshotFilter
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
`
);
