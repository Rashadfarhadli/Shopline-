import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a83279", "#3264a8"];

export default function OrderStatsDashboard() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/orders")
      .then((res) => res.json())
      .then((orders) => {
        const productCounts = {};

        orders.forEach((order) => {
          order.items.forEach((item) => {
            productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
          });
        });

        const barChartData = Object.entries(productCounts).map(([name, quantity]) => ({
          name,
          quantity,
        }));

        const pieChartData = Object.entries(productCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, quantity]) => ({
            name,
            value: quantity,
          }));

        setBarData(barChartData);
        setPieData(pieChartData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  if (!barData.length || !pieData.length) {
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
        Yüklənir...
      </p>
    );
  }

  return (
    <div className="p-4 space-y-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
    
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-full">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Məhsul Satış Statistikası (Hamısı)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={barData}
            margin={{ top: 15, right: 20, left: 10, bottom: 60 }}
            barCategoryGap="15%"
          >
            <XAxis
              dataKey="name"
              stroke="#8884d8"
              interval={0}
              angle={-40}
              textAnchor="end"
              height={60}
              tick={{ fill: "#8884d8", fontSize: 10 }}
            />
            <YAxis
              allowDecimals={false}
              stroke="#8884d8"
              tick={{ fill: "#8884d8", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "8px" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-full">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Ən Populyar Məhsullar (Top 5)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={{ fontSize: 11 }}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={30}
              wrapperStyle={{ fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
