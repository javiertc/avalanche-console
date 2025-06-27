// Metrics API configuration based on https://developers.avacloud.io/metrics-api/getting-started
export const METRICS_API_BASE_URL = "https://metrics.avax.network/v2";

export const AVALANCHE_CHAINS = [
  { id: "43114", name: "Avalanche C-Chain (Mainnet)", network: "mainnet" },
  { id: "43113", name: "Avalanche C-Chain (Fuji Testnet)", network: "testnet" },
  { id: "11111", name: "Avalanche P-Chain", network: "mainnet" },
  { id: "22222", name: "Avalanche X-Chain", network: "mainnet" },
] as const;

export const METRIC_TYPES = [
  { 
    value: "activeAddresses", 
    label: "Active Addresses", 
    description: "Number of unique addresses that performed transactions",
    unit: "addresses"
  },
  { 
    value: "transactions", 
    label: "Transaction Count", 
    description: "Total number of transactions on the chain",
    unit: "transactions"
  },
  { 
    value: "gasUsed", 
    label: "Gas Used", 
    description: "Total gas consumed by transactions",
    unit: "gas"
  },
  { 
    value: "blockCount", 
    label: "Block Count", 
    description: "Number of blocks produced",
    unit: "blocks"
  },
] as const;

export const TIME_INTERVALS = [
  { value: "hour", label: "Hourly" },
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
] as const;

export const TIME_RANGES = [
  { value: "1d", label: "Last 24 Hours", hours: 24 },
  { value: "7d", label: "Last 7 Days", hours: 24 * 7 },
  { value: "30d", label: "Last 30 Days", hours: 24 * 30 },
  { value: "90d", label: "Last 90 Days", hours: 24 * 90 },
] as const;

// Sample data structure from the API documentation
export interface MetricDataPoint {
  value: number;
  timestamp: number;
}

export interface MetricsResponse {
  results: MetricDataPoint[];
}

// Code examples for different programming languages
export const CODE_EXAMPLES = {
  curl: {
    title: "cURL",
    language: "bash",
    code: `curl --request GET \\
  --url 'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31'`
  },
  javascript: {
    title: "JavaScript",
    language: "javascript", 
    code: `const response = await fetch(
  'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses?startTimestamp=1722470400&endTimestamp=1725062400&timeInterval=day&pageSize=31'
);

const data = await response.json();
console.log('Active addresses data:', data.results);

// Use with Chart.js, D3.js, Highcharts, Plotly.js, or Recharts
const chartData = data.results.map(item => ({
  x: new Date(item.timestamp * 1000),
  y: item.value
}));`
  },
  python: {
    title: "Python",
    language: "python",
    code: `import requests
import pandas as pd
from datetime import datetime

url = "https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses"
params = {
    "startTimestamp": 1722470400,
    "endTimestamp": 1725062400,
    "timeInterval": "day",
    "pageSize": 31
}

response = requests.get(url, params=params)
data = response.json()

# Convert to pandas DataFrame for analysis
df = pd.DataFrame(data['results'])
df['date'] = pd.to_datetime(df['timestamp'], unit='s')
print(df.head())`
  },
  node: {
    title: "Node.js",
    language: "javascript",
    code: `const axios = require('axios');

async function getMetrics() {
  try {
    const response = await axios.get(
      'https://metrics.avax.network/v2/chains/43114/metrics/activeAddresses',
      {
        params: {
          startTimestamp: 1722470400,
          endTimestamp: 1725062400,
          timeInterval: 'day',
          pageSize: 31
        }
      }
    );
    
    return response.data.results;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
}

getMetrics().then(data => {
  console.log('Metrics data:', data);
});`
  }
} as const; 