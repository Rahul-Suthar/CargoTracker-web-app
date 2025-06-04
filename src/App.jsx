import { useState, useEffect } from "react";
import dayjs from "dayjs";
import AddShipment from "./components/AddShipment";
import UpdateLoc from "./components/UpdateLoc";
import { useShipmentContext } from "./context/ShipmentContext";

const App = () => {
  const { form, setForm, shipments, setLoc, updateForm, setUpdateForm, setUpdateId } = useShipmentContext();
  const columns = [
    "Shipment-Id",
    "Container-Id",
    "Routes",
    "Location",
    "Status",
    "ETA",
  ];

  return (
    <>
      <AddShipment />
      <UpdateLoc />
      <div
        className={`m-5 max-h-screen transition-all duration-100 ${
          form || updateForm ? "opacity-10 pointer-events-none" : ""
        }`}
      >
        <div className="shipment-add-div">
          <h1>Dashboard</h1>
          <button
            className="shipment-add"
            onClick={() => setForm(true)}
          >
            Add
          </button>
        </div>
        <div className="table-container">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((column, index) => (
                  <th key={index} className="p-2 text-center">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {shipments.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t hover:bg-gray-200">
                  <td className="p-2">{row.shipmentId}</td>
                  <td className="p-2">{row.containerId}</td>
                  <td className="p-2">{row.routes.join(" → ")}</td>
                  <td
                    className="p-2 cursor-pointer"
                    onDoubleClick={() => {
                      setLoc(row.location);
                      setUpdateId(row.shipmentId);
                      setUpdateForm(true);
                    }}
                  >
                    {row.location}
                  </td>
                  <td className="p-2 whitespace-nowrap">{row.status}</td>
                  <td className="p-2 whitespace-nowrap">
                    {dayjs(row.eta).format("DD-MM-YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
  );
};

export default App;
