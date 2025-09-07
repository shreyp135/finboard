import React from "react";
import { useGetStockQuery } from "@/api/alpha_api";

export default function CardWidget({ symbol = "AAPL" }) {
  const { data, isLoading } = useGetStockQuery(symbol);

  if (isLoading) return <p>Loading card...</p>;

  const series = data["Time Series (Daily)"];
  const latestDate = Object.keys(series)[0];
  const latest = series[latestDate]["4. close"];

  return (
    <div className="p-6 bg-blue-100 rounded-2xl shadow text-center">
      <h2 className="font-bold text-lg">{symbol}</h2>
      <p className="text-2xl font-semibold">${latest}</p>
      <p className="text-gray-600 text-sm">As of {latestDate}</p>
    </div>
  );
}
