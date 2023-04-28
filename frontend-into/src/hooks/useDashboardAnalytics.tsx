import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SNAPSHOT } from "../grahpql/operations/queries/getPairInfo";
import {
  Query,
  QueryGetPairSnapshotsByDateRangeArgs,
  SnapshotPairData,
} from "../__generated__/graphql";

import { initialPairs } from "@/constants/pairs";

interface Props {
  initialPairAddress: string;
  fromRange: number;
}

/**
 * Custom hook to manage and fetch dashboard analytics data.
 * @function useDashboardAnalytics
 * @param {Props} props - Props for the hook.
 * @returns  Object containing data and handlers for the dashboard analytics.
 */
export function useDashboardAnalytics({
  initialPairAddress,
  fromRange,
}: Props) {
  const [selectedHours, setSelectedHours] = useState(fromRange);
  const [selectedPair, setSelectedPair] = useState(initialPairAddress);
  const [snapshots, setSnapshots] = useState<SnapshotPairData[]>([]);
  const { loading, error, data, refetch } = useQuery<
    Query,
    QueryGetPairSnapshotsByDateRangeArgs
  >(GET_SNAPSHOT, {
    variables: {
      pairSnapshotFilter: {
        pairAddress: selectedPair,
        lastSnapshotsFromNow: 24,
      },
    },
  });

  useEffect(() => {
    if (!data && loading) {
      return;
    }
    const filteredSnapshots = data!.getPairSnapshotsByDateRange!.slice(
      0,
      selectedHours
    );
    setSnapshots(filteredSnapshots);
  }, [data, loading, selectedHours, selectedPair]);

  const onHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHours(Number(e.target.value));
  };

  const onPairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPair(e.target.value);
  };

  return {
    loading,
    error,
    selectedHours,
    selectedPair,
    snapshots,
    onHoursChange,
    onPairChange,
    refetch,
  };
}
