import { useState, useEffect } from "react";
import { ShipmentContext } from "./ShipmentContext";
import axios from "axios";

export const ShipmentProvider = ({ children }) => {
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
  return (
    <ShipmentContext.Provider value={{
        form, setForm,
        shipId, setShipId,
        contId, setContId,
        routes, setRoutes,
        location, setLocation,
        status, setStatus,
        eta, setEta,
        shipments, setShipments,
        loc, setLoc,
        updateId, setUpdateId,
        updateForm, setUpdateForm,
        fetchShipments, apiUrl,
    }}>
        {children}
    </ShipmentContext.Provider>
  );
};
