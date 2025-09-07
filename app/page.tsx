"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addWidget, removeWidget } from "@/redux/slices/dashboard_slice";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@/public/svg-icons/add-icon";
import Logo from "@/public/svg-icons/logo";
import React from "react";
import AddWidgetModal from "./components/widget_modal";
import CardWidget from "./components/widgets/Card";
import ChartWidget from "./components/widgets/Chart";
import TableWidget from "./components/widgets/Table";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function Home() {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

    const layout = widgets.map((w, i) => ({
    i: w.id,
    x: (i * 2) % 12,
    y: Math.floor(i / 6) * 2,
    w: 4,
    h: 3,
  }));

  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case "chart":
        return <ChartWidget symbol={widget.symbol || "RELIANCE.BSE"} />;
      case "table":
        return <TableWidget symbol={widget.symbol || "RELIANCE.BSE"} />;
      case "card":
        return <CardWidget symbol={widget.symbol || "RELIANCE.BSE"} />;
      default:
        return <p>Unknown widget</p>;
    }
  };


  return (
    <div className="">
      <header className="flex justify-between items-center mb-6 bg-gray-900 px-20 py-2.75 border-b border-gray-700 ">
        <div className="flex items-center gap-3 text-white">
          <Logo />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">FinBoard Dashboard</h1>
            <p className="text-sm text-gray-300">
              Connect to API's and build your custom dashboard
            </p>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-3 py-1.5 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:shadow-md hover:cursor-pointer"
        >
          <div className="flex items-center align-middle gap-1">
            <AddIcon />
            <span className="text-center font-normal">Add Widget</span>
          </div>
        </button>
      </header>

      {/* <div className="grid grid-cols-2 gap-4">
        {widgets.map((w: any) => (
          <div
            key={w.id}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <span>
              {w.title} ({w.type})
            </span>
            <button
              onClick={() => dispatch(removeWidget(w.id))}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div> */}
      <div>
              {widgets.length === 0 ? (
        <p className="text-gray-600">No widgets added yet. Click “Add Widget” to start.</p>
      ) : (
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1200}
          draggableHandle=".drag-handle"
        >
          {widgets.map((w) => (
            <div key={w.id} className="bg-white rounded-2xl shadow p-2 relative">
              {/* Drag Handle */}
              <div className="drag-handle cursor-move absolute top-2 right-10 text-gray-400 text-sm">
                ⠿
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeWidget(w.id))}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>

              {/* Actual Widget */}
              {renderWidget(w)}
            </div>
          ))}
        </GridLayout>
      )}

      </div>
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
