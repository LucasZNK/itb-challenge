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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Hourly Volume USD Chart",
    },
  },
};

function getHourlyVolumeUSD(snapshotData: any) {
  return snapshotData.map((item: any) => item.hourlyVolumeUSD);
}

function generateLabels(hours: any) {
  const labels = [];
  for (let i = 0; i < hours; i++) {
    labels.push(`${i}h`);
  }
  return labels;
}

export const data = (snapshotData: any, hours: any) => {
  const labels = generateLabels(hours);
  return {
    labels,
    datasets: [
      {
        label: "Hourly Volume USD",
        data: getHourlyVolumeUSD(snapshotData),
        borderColor: "#2E71F0",
        backgroundColor: "#2E71F0",
      },
    ],
  };
};

interface Props {
  snapshotData: SnapshotPairData[];
  hours: number;
}

export function LineChart({ snapshotData, hours = 40 }: Props) {
  console.log(snapshotData.length);
  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={data(snapshotData, hours)} />
    </div>
  );
}
