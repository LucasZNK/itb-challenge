import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./LineChart.module.css";
import { SnapshotPairData } from "@/__generated__/graphql";
import { dataBuilder, options } from "./helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  snapshotData: SnapshotPairData[];
  hours: number;
}

export function LineChart({ snapshotData, hours = 24 }: Props) {
  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={dataBuilder(snapshotData, hours)} />
    </div>
  );
}
