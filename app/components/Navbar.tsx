import React from "react";
import Logo from "@/public/svg-icons/logo";
import AddIcon from "@/public/svg-icons/add-icon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface NavbarProps {
  handleOpenModal: () => void;
}

export default function Navbar({ handleOpenModal }: NavbarProps) {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  return (
    <header className="flex justify-between items-center mb-6 bg-gray-900 px-20 py-2.75 border-b border-gray-700 ">
      <div className="flex items-center gap-3 text-white">
        <Logo />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">FinBoard Dashboard</h1>
          {widgets.length === 0 && (
            <p className="text-sm text-gray-300">
              Connect to API's and build your custom dashboard
            </p>
          )}
          {widgets.length > 0 && (
            <p className="text-sm text-gray-300">
              {widgets.length} {widgets.length > 1 ? "s" : ""} active widget | Real Time Data
            </p>
          )}
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
  );
}
