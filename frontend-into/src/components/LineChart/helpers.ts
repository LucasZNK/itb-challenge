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

// Chart options for the Line chart
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

/**
 * Generates labels for the X-axis of the chart.
 * @param {number} hours - Number of hours to generate labels for.
 * @returns {string[]} - Array of labels.
 */
function generateLabels(hours: number) {
  const labels = [];
  for (let i = 0; i < hours; i++) {
    labels.push(`${i}h`);
  }
  return labels;
}

/**
 * Calculates the hourly APR for each snapshot.
 * @param {SnapshotPairData[]} snapshotData - Array of snapshot data.
 * @param {number} period - Number of hours in the period.
 * @returns {number[]} - Array of hourly APR values.
 */
function getHourlyAPR(snapshotData: SnapshotPairData[], period: number) {
  const annualizationFactor = (24 * 365) / period;
  return snapshotData.map((item: SnapshotPairData) => {
    const hourlyFees = item.hourlyPairFees;
    const reserveUSD = item.reserveUSD;

    const apr = (hourlyFees / reserveUSD) * 100 * annualizationFactor;
    return apr;
  });
}

/**
 * Prepares the data object for the Line chart.
 * @param {SnapshotPairData[]} snapshotData - Array of snapshot data.
 * @param {number} period - Number of hours in the period.
 * @returns {object} - Data object for the Line chart.
 */
export function dataBuilder(snapshotData: SnapshotPairData[], period: number) {
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
}
