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
import { initialPairs } from "../../constants/pairs";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";

/**
 * DashboardAnalytics component that displays snapshot data for selected pair and time range.
 */
const DashboardAnalytics = () => {
  const {
    loading,
    error,
    selectedHours,
    selectedPair,
    snapshots,
    onHoursChange,
    onPairChange,
  } = useDashboardAnalytics({
    initialPairAddress: initialPairs[0],
    fromRange: 24,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <>
      <label className={styles.rangeLabel}>
        Select range:
        <select value={selectedHours} onChange={onHoursChange}>
          <option value={1}>1hr</option>
          <option value={12}>12hr</option>
          <option value={24}>24hr</option>
        </select>
      </label>
      <label className={styles.rangeLabel}>
        Select pair:
        <select value={selectedPair} onChange={onPairChange}>
          {initialPairs.map((pair, index) => (
            <option key={index} value={pair}>
              {pair}
            </option>
          ))}
        </select>
      </label>
      <CardsInfo period={selectedHours} snapshotData={snapshots} />
      {!loading && snapshots && (
        <LineChart snapshotData={snapshots} hours={selectedHours} />
      )}
    </>
  );
};

export default DashboardAnalytics;
