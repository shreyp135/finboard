"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "@/redux/slices/dashboard_slice";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddWidgetModal({ isOpen, onClose }: Props) {
  const dispatch = useDispatch();

  type WidgetType = "chart" | "table" | "card";

  const [type, setType] = useState<WidgetType>("card");
  const [symbol, setSymbol] = useState("AAPL");

  const handleAdd = () => {
    dispatch(addWidget({ id: uuidv4(), type, title: symbol }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">➕ Add Widget</h2>

        <label className="block mb-2 font-semibold">Widget Type</label>
        <select
          className="w-full border p-2 rounded mb-4"
          value={type}
          onChange={(e) => setType(e.target.value as WidgetType)}
        >
          <option value="card">Finance Card</option>
          <option value="chart">Stock Chart</option>
          <option value="table">Stock Table</option>
        </select>

        <label className="block mb-2 font-semibold">Stock Symbol</label>
        <input
          className="w-full border p-2 rounded mb-4"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. AAPL, TSLA, MSFT"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
