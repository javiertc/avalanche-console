import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface EndpointUsageData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: EndpointUsageData[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ data }) => (
  <RechartsPieChart>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={40}
      outerRadius={80}
      paddingAngle={5}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
  </RechartsPieChart>
);

export default PieChartComponent; 