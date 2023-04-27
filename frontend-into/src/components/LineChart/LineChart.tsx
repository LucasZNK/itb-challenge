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
  scales: {
    y: {
      ticks: {
        autoSkip: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Hourly APR Chart",
    },
  },
};

function generateLabels(hours: number) {
  const labels = [];
  for (let i = 0; i < hours; i++) {
    labels.push(`${i}h`);
  }
  return labels;
}

function getHourlyAPR(snapshotData: SnapshotPairData[], period: number) {
  const annualizationFactor = (24 * 365) / period;
  return snapshotData.map((item: SnapshotPairData) => {
    const hourlyFees = item.hourlyPairFees;
    const reserveUSD = item.reserveUSD;

    const apr = (hourlyFees / reserveUSD) * 100 * annualizationFactor;
    return apr;
  });
}

export const data = (snapshotData: SnapshotPairData[], period: number) => {
  const labels = generateLabels(period);
  return {
    labels,
    datasets: [
      {
        label: "Hourly APR",
        data: getHourlyAPR(snapshotData, period),
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

export function LineChart({ snapshotData, hours = 24 }: Props) {
  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={data(snapshotData, hours)} />
    </div>
  );
}
