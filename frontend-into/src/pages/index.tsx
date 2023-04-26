import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./index.module.css";
import { useProSidebar } from "react-pro-sidebar";
import DashboardAnalytics from "../components/DashboardAnalytics/DashboardAnalytics";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | ITB </title>
        <meta name="dashboard" content="Into the blocks Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentContainer}>
        <DashboardAnalytics />
      </div>
    </>
  );
}
