import { useQuery } from "@apollo/client";
import { GET_SNAPSHOT } from "../../grahpql/operations/queries/getPairInfo";
import {
  Query,
  QueryGetPairSnapshotsByDateRangeArgs,
} from "../../__generated__/graphql";
import { LineChart } from "@/components/LineChart/LineChart";

interface DashboardDataProps {}

const DashboardAnalytics: React.FC<DashboardDataProps> = () => {
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
      Hello world
      {!loading && data && (
        <LineChart
          snapshotData={data.getPairSnapshotsByDateRange!}
          hours={24}
        />
      )}
    </>
  );
};

export default DashboardAnalytics;
