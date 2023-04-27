import { useQuery } from "@apollo/client";
import { GET_SNAPSHOT } from "../../grahpql/operations/queries/getPairInfo";
import {
  Query,
  QueryGetPairSnapshotsByDateRangeArgs,
} from "../../__generated__/graphql";
import { LineChart } from "@/components/LineChart/LineChart";
import { useState } from "react";

interface DashboardDataProps {}

const DashboardAnalytics: React.FC<DashboardDataProps> = () => {
  const [selectedHours, setSelectedHours] = useState(24);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  console.log(data);

  return (
    <>
      <label>
        Select range:
        <select
          value={selectedHours}
          onChange={(e) => setSelectedHours(Number(e.target.value))}
        >
          <option value={1}>1hr</option>
          <option value={12}>12hr</option>
          <option value={24}>24hr</option>
        </select>
      </label>
      {!loading && data && (
        <LineChart
          snapshotData={data.getPairSnapshotsByDateRange!.slice(
            0,
            selectedHours
          )}
          hours={selectedHours}
        />
      )}
    </>
  );
};

export default DashboardAnalytics;
