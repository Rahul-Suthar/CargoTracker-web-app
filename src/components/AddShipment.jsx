import { useShipmentContext } from "../context/ShipmentContext";
import dayjs from "dayjs";
import axios from "axios";

const AddShipment = () => {
  const {
    shipId,
    setShipId,
    contId,
    setContId,
    routes,
    setRoutes,
    status,
    setStatus,
    eta,
    setEta,
    location,
    setLocation,
    form,
    setForm,
    fetchShipments,
    apiUrl,
  } = useShipmentContext();

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
      await axios.post(`${apiUrl}/shipment`, newShipment);
      alert("New shipment added successfully!");
      await fetchShipments();
      setForm(false);
    } catch (err) {
      alert("Failed to add new shipment. Please try again.");
      return;
    }
  };

  return (
    <div>
      {form && (
        <div className="form-container top-30">
          <div className="form-outer-div">
            <h2 >Add Shipment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-div">
                <input
                  type="text"
                  placeholder="shipment-id"
                  value={shipId.trim()}
                  onChange={(e) => {
                    setShipId(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="container-id"
                  value={contId.trim()}
                  onChange={(e) => {
                    setContId(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="routes (eg. - SIN, LA)"
                  value={routes}
                  onChange={(e) => {
                    setRoutes(e.target.value);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="location"
                  value={location.trim()}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                />
                <input
                  type="date"
                  placeholder="estimated Arrival (DD-MM-YYYY)"
                  value={eta}
                  onChange={(e) => {
                    setEta(e.target.value);
                  }}
                  required
                />
                <select
                  name="status"
                  defaultValue=""
                  value={status.trim()}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  required
                  className="status-select"
                >
                  <option value="">Status</option>
                  <option value="In-Transit">In-Transit</option>
                  <option value="Awaiting Departure">Awaiting Departure</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="form-btn-div">
                <button
                  type="button"
                  className="form-btn bg-red-500"
                  onClick={() => setForm(false)}
                >
                  Close
                </button>
                <button
                  className="form-btn bg-blue-500"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddShipment;
