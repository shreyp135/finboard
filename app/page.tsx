"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addWidget, removeWidget } from "@/redux/slices/dashboard_slice";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import AddWidgetModal from "./components/widget_modal";
import CardWidget from "./components/widgets/Card";
import ChartWidget from "./components/widgets/Chart";
import TableWidget from "./components/widgets/Table";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Navbar from "./components/Navbar";

export default function Home() {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const layout = [
    ...widgets.map((w, i) => ({
      i: w.id,
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * 2,
      w: 4,
      h: 3,
    })),
    {
      i: "add-widget", // unique ID for add card
      x: (widgets.length * 2) % 12,
      y: Math.floor(widgets.length / 6) * 2,
      w: 4,
      h: 3,
      static: true, // not draggable/resizable
    },
  ];

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
      <Navbar handleOpenModal={handleOpenModal} />
      <div>
        {widgets.length === 0 ? (
          <p className="text-gray-600">
            No widgets added yet. Click “Add Widget” to start.
          </p>
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
              <div
                key={w.id}
                className="bg-white rounded-2xl shadow p-2 relative"
              >
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
