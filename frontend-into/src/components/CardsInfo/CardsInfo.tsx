import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { SnapshotPairData } from "@/__generated__/graphql";
import styles from "./CardsInfo.module.css";
import Card from "../Card/Card";

interface Props {
  period: number;
  snapshotData: SnapshotPairData[];
}

const formatValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} M`;
  } else if (value >= 100000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else {
    return value.toFixed(1);
  }
};

const CardsInfo = ({ snapshotData, period }: Props) => {
  const [volume, setVolume] = React.useState(0);
  const [apr, setApr] = React.useState(0);
  const [fees, setFees] = React.useState(0);

  useEffect(() => {
    if (!snapshotData || snapshotData.length === 0) {
      return;
    }

    function calculateStats() {
      let calculatedVolume = 0;
      let calculatedFee = 0;
      let calculatedReserveUSD = 0;

      snapshotData.forEach((item: SnapshotPairData) => {
        calculatedVolume += (Math.round(item.hourlyVolumeUSD) * 10) / 10;
        calculatedFee += (Math.round(item.hourlyPairFees) * 10) / 10;
        calculatedReserveUSD += item.reserveUSD;
      });

      setVolume(calculatedVolume);
      setFees(calculatedFee);

      // Cálculo de APR ajustado
      const annualizationFactor = (24 * 365) / period;
      setApr(
        (calculatedFee / calculatedReserveUSD) * 100 * annualizationFactor
      );
    }

    calculateStats();
  }, [snapshotData]);

  const formatPercentage = (value: number) => {
    return value.toFixed(2) + "%";
  };

  return (
    <div className={styles.contentContainer}>
      <span className={styles.sectionTitle}>Metrics for period {period} </span>
      <div className={styles.cardContainer}>
        <Card
          className={styles.cardStyles}
          title={`Volume last ${period} hours`}
          value={formatValue(volume)}
          showTransition={true}
        />
        <Card
          className={styles.cardStyles}
          title={`Fees last ${period} hours`}
          value={formatValue(fees)}
          showTransition={true}
        />
        <Card
          className={styles.cardStyles}
          title={`APR ${period} hours`}
          value={formatPercentage(apr)}
          showTransition={true}
        />
      </div>
    </div>
  );
};

export default CardsInfo;
