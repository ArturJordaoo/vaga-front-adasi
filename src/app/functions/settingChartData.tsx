import { gettingDate } from '../pages/getDate';

interface PriceData {
  0: number;
  1: number;
}

interface ChartDataset {
  label: string;
  data: number[];
  borderWidth: number;
  fill: boolean;
  backgroundColor?: string;
  tension: number;
  borderColor: string;
  pointRadius: number;
  yAxisID: string;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export const settingChartData = (
  setChartData: React.Dispatch<React.SetStateAction<ChartData>>,
  prices1: PriceData[],
  prices2?: PriceData[],
): void => {
  if (prices2) {
    setChartData({
      labels: prices1?.map((data) => gettingDate(data[0])),
      datasets: [
        {
          label: 'Crypto 1',
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          backgroundColor: 'rgba(58, 128, 233,0.1)',
          tension: 0.25,
          borderColor: '#3a80e9',
          pointRadius: 0,
          yAxisID: 'crypto1',
        },
        {
          label: 'Crypto 2',
          data: prices2?.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          borderColor: '#61c96f',
          pointRadius: 0,
          yAxisID: 'crypto2',
        },
      ],
    });
  } else {
    setChartData({
      labels: prices1?.map((data) => gettingDate(data[0])),
      datasets: [
        {
          label: 'Crypto 1',
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: true,
          backgroundColor: 'rgba(58, 128, 233,0.1)',
          tension: 0.25,
          borderColor: '#3a80e9',
          pointRadius: 0,
          yAxisID: 'crypto1',
        },
      ],
    });
  }
};
