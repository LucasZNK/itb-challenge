interface PairData {
  id: number;
  hourlyPairFees: number;
  hourlyVolumeToken0: number;
  hourlyVolumeToken1: number;
  hourlyVolumeUSD: number;
  reserve0: number;
  reserve1: number;
  reserveUSD: number;
  timestamp: string;
}

type MovingAverageWindow = 1 | 12 | 24;

interface CalculatedData {
  apr: number;
  totalAllocation: number;
  dayChange: number;
  liquidity: number;
  volume: number;
  fees: number;
}

export const calculateMetrics = (
  pairData: PairData[],
  window: MovingAverageWindow
): CalculatedData => {
  const hoursInYear = 8760;

  const totalHours = pairData.length;

  // Calculate the moving average of the reserveUSD.
  let movingAverageReserveUSD = 0;
  for (let i = totalHours - window; i < totalHours; i++) {
    movingAverageReserveUSD += pairData[i].reserveUSD;
  }
  movingAverageReserveUSD /= window;

  // Calculate the total fees in the selected window.
  let totalFees = 0;
  for (let i = totalHours - window; i < totalHours; i++) {
    totalFees += pairData[i].hourlyPairFees;
  }

  // Calculate the annualized fees.
  const annualFees = (totalFees * hoursInYear) / window;

  // Calculate the APR.
  const apr = (annualFees / movingAverageReserveUSD) * 100;

  // Calculate totalAllocation (reserve total), DayChange, and liquidity.
  const totalAllocation = pairData[totalHours - 1].reserveUSD;
  const dayChange =
    ((totalAllocation - pairData[totalHours - 24].reserveUSD) /
      pairData[totalHours - 24].reserveUSD) *
    100;
  const liquidity = movingAverageReserveUSD;

  // Calculate the volume and fees for the selected window.
  let volume = 0;
  for (let i = totalHours - window; i < totalHours; i++) {
    volume += pairData[i].hourlyVolumeUSD;
  }

  return {
    apr,
    totalAllocation,
    dayChange,
    liquidity,
    volume,
    fees: totalFees,
  };
};
