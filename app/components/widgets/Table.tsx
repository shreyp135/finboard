import React from "react";
import { useGetStockQuery } from "@/api/alpha_api"; 

export default function TableWidget({ symbol = "AAPL" }) {
  const { data, isLoading } = useGetStockQuery(symbol);

  if (isLoading) return <p>Loading table...</p>;

  const series = data["Time Series (Daily)"];
  const rows = Object.keys(series).slice(0, 5).map((date) => ({
    date,
    open: series[date]["1. open"],
    high: series[date]["2. high"],
    low: series[date]["3. low"],
    close: series[date]["4. close"],
  }));

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="font-bold">{symbol} Recent Data</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Date</th><th>Open</th><th>Close</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.date} className="border-b">
              <td>{row.date}</td>
              <td>{row.open}</td>
              <td>{row.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
