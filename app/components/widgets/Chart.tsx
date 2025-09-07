import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetStockQuery } from "@/api/alpha_api";

export default function ChartWidget({ symbol = "RELIANCE.BSE" }) {
  const { data, isLoading, error } = useGetStockQuery(symbol);

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Error fetching stock data</p>;

  const series = data["Time Series (Daily)"];
  const chartData = Object.keys(series).slice(0, 30).map((date) => ({
    date,
    price: parseFloat(series[date]["4. close"]),
  }));

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="font-bold">{symbol} Stock Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData.reverse()}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
