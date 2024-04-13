import { barChartDataHandler } from "@/src/handlers/boxChartDataHandler";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { topicItemsCountHandler } from "@/src/handlers/topicItemsCountHandler";
import { categoryTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import SelectCategory from "./selectCategory/selectCategory";
interface DataType {
  name: string;
  Reviewed: number;
  Pending: number;
}
interface DataPoint {
  name: string;
  value: number;
}

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
  const [data, setData] = useState<DataType[]>([
    { name: "Box 1", Reviewed: 0, Pending: 0 },
    { name: "Box 2", Reviewed: 0, Pending: 0 },
    { name: "Box 3", Reviewed: 0, Pending: 0 },
    { name: "Box 4", Reviewed: 0, Pending: 0 },
    { name: "Box 5", Reviewed: 0, Pending: 0 },
  ]);
  useEffect(() => {
    const chartData = barChartDataHandler({ data, category: null });
    console.log(chartData);

    setData(chartData);
  }, [data]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
        <SelectCategory/>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            label={renderCustomBarLabel}
            dataKey="Reviewed"
            fill="lightgreen"
            barSize={50}
            stackId="i"
          />
          <Bar
            label={renderCustomBarLabel}
            dataKey="Pending"
            fill="red"
            barSize={50}
            stackId="i"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BoxChart;
