import { useQuery } from "@apollo/client";
import { GET_SNAPSHOT } from "../../grahpql/operations/queries/getPairInfo";
import {
  Query,
  QueryGetPairSnapshotsByDateRangeArgs,
  SnapshotPairData,
} from "../../__generated__/graphql";
import { LineChart } from "@/components/LineChart/LineChart";
import { useEffect, useState } from "react";
import CardsInfo from "../CardsInfo/CardsInfo";
import styles from "./DashboardAnalytics.module.css";
interface DashboardDataProps {}

const DashboardAnalytics: React.FC<DashboardDataProps> = () => {
  const [selectedHours, setSelectedHours] = useState(24);
  const [snapshots, setSnapshots] = useState<SnapshotPairData[]>([]);
  const { loading, error, data, refetch } = useQuery<
    Query,
    QueryGetPairSnapshotsByDateRangeArgs
  >(GET_SNAPSHOT, {
    variables: {
      pairSnapshotFilter: {
        pairAddress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
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
  }, [data, loading, selectedHours]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const onHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSnapshots(data!.getPairSnapshotsByDateRange!.slice(0, selectedHours));
  };

  return (
    <>
      <label className={styles.rangeLabel}>
        Select range:
        <select
          value={selectedHours}
          onChange={(e) => {
            setSelectedHours(Number(e.target.value));
          }}
        >
          <option value={1}>1hr</option>
          <option value={12}>12hr</option>
          <option value={24}>24hr</option>
        </select>
      </label>
      <CardsInfo period={selectedHours} snapshotData={snapshots} />
      {!loading && data && (
        <LineChart snapshotData={snapshots} hours={selectedHours} />
      )}
    </>
  );
};

export default DashboardAnalytics;
