import { createContext, useContext } from "react";

export const ShipmentContext = createContext();

export const useShipmentContext = () => useContext(ShipmentContext);