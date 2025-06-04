import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const App = () => {
  const [form, setForm] = useState(false);
  const [shipId, setShipId] = useState("");
  const [contId, setContId] = useState("");
  const [routes, setRoutes] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [eta, setEta] = useState("");
  const [shipments, setShipments] = useState([]);
  const [loc, setLoc] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchShipments = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${apiUrl}/shipments`);
      setShipments(res.data);
    } catch (err) {
      console.error("Error fetching shipment data:", err);
    }
  };

  useEffect(() => {
    setShipId("");
    setContId("");
    setRoutes("");
    setLocation("");
    setStatus("");
    setEta("");
  }, [form]);

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await axios.patch(`${apiUrl}/shipment/${updateId}/update-location`, {
        location: loc.toUpperCase(),
      })
      alert("Location updated successfully!");
      setUpdateForm(false);
      await fetchShipments();
      setLoc("");
      setUpdateId("");
    } catch (err) {
      alert("Failed to update location. Please try again.");
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatedEta = dayjs(eta);
    if (!formatedEta.isValid()) {
      alert("Please enter a valid date.");
      return;
    }
    if (formatedEta.isBefore(dayjs(), "day")) {
      alert("ETA cannot be in the past.");
      return;
    }

    const newShipment = {
      shipmentId: shipId.toUpperCase(),
      containerId: contId.toUpperCase(),
      routes: routes.split(",").map((r) => r.trim().toUpperCase()),
      location: location.toUpperCase(),
      status: status,
      eta: formatedEta.toISOString(),
    };

    try {
      await axios.post(`${apiUrl}/shipment`, newShipment)
      alert("New shipment added successfully!");
      await fetchShipments();
      setForm(false);
    } catch (err) {
      alert("Failed to add new shipment. Please try again.");
      return;
    }
  };

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
      {form && (
        <div className="fixed top-30 z-10 flex justify-center w-full h-full transition-all duration-100">
          <div className="bg-white border border-gray-600 p-5 w-[80%] sm:w-[40%] h-fit rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Add Shipment</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-3 ">
                <input
                  type="text"
                  placeholder="shipment-id"
                  value={shipId.trim()}
                  onChange={(e) => {
                    setShipId(e.target.value);
                  }}
                  required
                  className="m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                />
                <input
                  type="text"
                  placeholder="container-id"
                  value={contId.trim()}
                  onChange={(e) => {
                    setContId(e.target.value);
                  }}
                  required
                  className="m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                />
                <input
                  type="text"
                  placeholder="routes (eg. - SIN, LA)"
                  value={routes}
                  onChange={(e) => {
                    setRoutes(e.target.value);
                  }}
                  required
                  className="m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                />
                <input
                  type="text"
                  placeholder="location"
                  value={location.trim()}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                  className="m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                />
                <input
                  type="date"
                  placeholder="estimated Arrival (DD-MM-YYYY)"
                  value={eta}
                  onChange={(e) => {
                    setEta(e.target.value);
                  }}
                  required
                  className="m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                />
                <select
                  name="status"
                  defaultValue=""
                  value={status.trim()}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  required
                  className="cursor-pointer m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                >
                  <option value="">Status</option>
                  <option value="In-Transit">In-Transit</option>
                  <option value="Awaiting Departure">Awaiting Departure</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-around gap-4">
                <button
                  type="button"
                  className="cursor-pointer text-white bg-red-500 py-1.5 px-10 rounded shadow-blue-200 shadow active:scale-90 transition-all"
                  onClick={() => setForm(false)}
                >
                  Close
                </button>
                <button
                  className="cursor-pointer text-white bg-blue-500 py-1.5 px-10 rounded shadow-blue-200 shadow active:scale-90 transition-all"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {updateForm && (
        <div className="fixed b z-10 flex justify-center w-full h-full transition-all duration-100">
          <div className="bg-white border border-gray-600 p-5 w-[80%] sm:w-[40%] h-fit rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Update Loctaion</h2>
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col gap-2 mb-3 ">
                <input
                  type="text"
                  placeholder="location"
                  value={loc.trim()}
                  onChange={(e) => {
                    setLoc(e.target.value);
                  }}
                  required
                  className="m-2 px-2 py-1 outline-none border border-gray-400 focus:border-blue-500 focus:border-2 rounded"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-around gap-4">
                <button
                  type="button"
                  className="cursor-pointer text-white bg-red-500 py-1.5 px-10 rounded shadow-blue-200 shadow active:scale-90 transition-all"
                  onClick={() => setUpdateForm(false)}
                >
                  Close
                </button>
                <button
                  className="cursor-pointer text-white bg-blue-500 py-1.5 px-10 rounded shadow-blue-200 shadow active:scale-90 transition-all"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div
        className={`m-5 max-h-screen transition-all duration-100 ${
          form ? "opacity-10 pointer-events-none" : ""
        }`}>
        <div className="flex flex-col p-4 sm:flex-row sm:justify-between sm:items-center mb-3">
          <h1 className="text-2xl font-semibold sm:mb-5 sm:p-2">Dashboard</h1>
          <button
            className="cursor-pointer absolute bottom-15 w-[80%] sm:static sm:w-fit text-white bg-blue-500 py-2 px-10 rounded shadow-blue-200 shadow active:scale-90 transition-all"
            onClick={() => setForm(true)}
          >
            Add
          </button>
        </div>
        <div className="max-h-[70vh] sm:max-h-[80vh] text-sm border rounded-lg shadow-lg overflow-auto">
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
                <tr
                  key={rowIndex}
                  className="border-t hover:bg-gray-200"
                >
                  <td className="p-2">{row.shipmentId}</td>
                  <td className="p-2">{row.containerId}</td>
                  <td className="p-2">{row.routes.join(" → ")}</td>
                  <td className="p-2 cursor-pointer" onDoubleClick={()=>{
                    setLoc(row.location);
                    setUpdateId(row.shipmentId);
                    setUpdateForm(true);
                  }}>{row.location}</td>
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
