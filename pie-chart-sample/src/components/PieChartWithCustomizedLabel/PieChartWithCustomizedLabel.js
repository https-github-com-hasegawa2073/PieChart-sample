import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Line,
  Legend,
  Tooltip,
  LabelList,
} from "recharts";

export const PieChartWithCustomizedLabel = () => {
  const data = [
    { name: "散歩する", value: 400 },
    { name: "買い物に行く", value: 300 },
    { name: "映画を見る", value: 300 },
    { name: "本を読む", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="name"
            position="outside"
            fill="gray"
            stroke="gray"
            offset={20}
          />
        </Pie>
        <Legend verticalAlign="top" height={36} />
        <Tooltip cursor={true} animationDuration={1000} />

        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </PieChart>
    </>
  );
};
