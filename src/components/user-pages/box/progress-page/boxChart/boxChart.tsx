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
import { useAppSelector } from "@/src/app/hooks";
import _ from "lodash";
import TotalData from "./totalData/totalData";
import { boxChartDataHandler } from "@/src/handlers/boxChartDataHandler";

interface DataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

interface lableTypes {
  payload: string;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}
const renderCustomBarLabel = (lable: lableTypes) => {
  const { payload, x, y, width, height, value } = lable;
  return (
    <text
      style={{ fontWeight: "bold" }}
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >
      {value}
    </text>
  );
};
const initialData: DataType[] = [
  { name: "Box 1", Reviewed: 0, Pending: 0 },
  { name: "Box 2", Reviewed: 0, Pending: 0 },
  { name: "Box 3", Reviewed: 0, Pending: 0 },
  { name: "Box 4", Reviewed: 0, Pending: 0 },
  { name: "Box 5", Reviewed: 0, Pending: 0 },
];
const BoxChart: React.FC = () => {
  const { category } = useAppSelector((state) => state.categoryState);
  const [data, setData] = useState<DataType[]>(initialData);
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    if (!data) {
      boxChartDataHandler(_.cloneDeep(initialData), category.id).then(
        (chartData) => {
          if (chartData) setData(chartData);
        },
      );
    }
  }, [data, category]);

  const handleChange = (id: string) => {
    boxChartDataHandler(_.cloneDeep(initialData), id).then((chartData) => {
      if (chartData) {
        setData(chartData);
        setCategoryId(id);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="flex flex-wrap justify-around items-center -mb-12">
        <SelectCategory handleChange={handleChange} />
        <TotalData categoryId={categoryId} data={data} />
      </div>
      <div className="w-full h-[400px] bg-blue-50 pt-8">
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <Tooltip />
            <CartesianGrid stroke="#cccccc99" strokeDasharray="5 5" />
            <Bar
              // label={renderCustomBarLabel}
              dataKey="Reviewed"
              fill="lightgreen"
              // barSize={50}
              stackId="i"
            />
            <Bar
              label={renderCustomBarLabel}
              dataKey="Pending"
              fill="red"
              // barSize={50}
              stackId="i"
            />
            <XAxis dataKey="name" stroke="#8884d8" />
            {/* <YAxis /> */}
            {/* <Legend/> */}
          </BarChart>
        </ResponsiveContainer>
        <p className="font-bold text-center">Leitner box chart</p>
      </div>
    </div>
  );
};

export default BoxChart;
