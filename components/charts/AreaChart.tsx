import React from 'react';
import { AreaChart as RechartsAreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';

interface ApiUsageData {
  date: string;
  dataApi: number;
  rpc: number;
  webhooks: number;
  total: number;
}

interface AreaChartProps {
  data: ApiUsageData[];
}

const AreaChartComponent: React.FC<AreaChartProps> = ({ data }) => (
  <RechartsAreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
    <YAxis stroke="hsl(var(--muted-foreground))" />
    <Area
      type="monotone"
      dataKey="total"
      stackId="1"
      stroke="hsl(var(--chart-1))"
      fill="hsl(var(--chart-1))"
      fillOpacity={0.6}
    />
  </RechartsAreaChart>
);

export default AreaChartComponent; 