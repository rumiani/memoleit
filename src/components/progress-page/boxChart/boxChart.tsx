import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}
const data = [
  { name: "Day 1", uv: 24, pv: 2400, amt: 2400 },
  { name: "Day 2", uv: 32, pv: 2400, amt: 2400 },
  { name: "Day 3", uv: 8, pv: 2400, amt: 2400 },
  { name: "Day 4", uv: 19, pv: 2400, amt: 2400 },
  { name: "Day 5", uv: 93, pv: 2400, amt: 2400 },
  { name: "Day 6", uv: 16, pv: 2400, amt: 2400 },
  { name: "Day 7", uv: 0, pv: 2400, amt: 2400 },
];
interface lableTypes {
  payload: string;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}
const renderCustomBarLabel = ({
  payload,
  x,
  y,
  width,
  height,
  value,
}: lableTypes) => {
  return (
    <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

const BoxChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          {/* <Tooltip /> */}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar
            label={renderCustomBarLabel}
            dataKey="uv"
            fill="#8884d8"
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BoxChart;
