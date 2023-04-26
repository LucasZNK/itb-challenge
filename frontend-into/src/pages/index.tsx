import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { GET_SNAPSHOT } from "../grahpql/operations/queries/getPairInfo";
import {
  Query,
  QueryGetPairSnapshotsByDateRangeArgs,
} from "../__generated__/graphql";
import { useProSidebar } from "react-pro-sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { loading, error, data, refetch } = useQuery<Query, QueryGetPairSnapshotsByDateRangeArgs>(GET_SNAPSHOT , {
  //   variables: {
  //     pairSnapshotFilter: {
  //       pairAddress: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  //       lastSnapshotsFromNow: 1,
  //     },
  //   },
  // });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // console.log(data)

  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <>
      <Head>
        <title>Dashboard | ITB </title>
        <meta name="dashboard" content="Into the blocks Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        Hello world
        {/* {data && data.getPairSnapshotsByDateRange[0]?.pair.address} */}
      </div>
      <button
        className="asd"
        onClick={() => {
          collapseSidebar(!collapsed);
        }}
      >
        Hello
      </button>
    </>
  );
}
