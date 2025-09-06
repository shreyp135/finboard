"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addWidget, removeWidget } from "@/redux/slices/dashboard_slice";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@/public/svg-icons/add-icon";
import Logo from "@/public/svg-icons/logo";

export default function Home() {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const dispatch = useDispatch();

  return (
    <div className="">
      <header className="flex justify-between items-center mb-6 bg-gray-900 px-20 py-2.75 border-b border-gray-700 ">
        <div className="flex items-center gap-3 text-white">
          <Logo />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">FinBoard Dashboard</h1>
            <p className="text-sm text-gray-300">Connect to API's and build your custom dashboard</p>
          </div>
        </div>
        <button
          onClick={() =>
            dispatch(
              addWidget({ id: uuidv4(), type: "card", title: "New Widget" })
            )
          }
          className="px-3 py-1.5 bg-green-700 text-white rounded-lg hover:bg-green-800 hover:shadow-md hover:cursor-pointer"
        >
          <div className="flex items-center align-middle gap-1">
            <AddIcon />
            <span className="text-center font-normal">Add Widget</span>
          </div>
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
