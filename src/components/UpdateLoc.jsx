import { useShipmentContext } from "../context/ShipmentContext";

const UpdateLoc = () => {

    const { loc, setLoc, updateId, setUpdateId, updateForm, setUpdateForm, fetchShipments, apiUrl } = useShipmentContext();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${apiUrl}/shipment/${updateId}/update-location`, {
        location: loc.toUpperCase(),
      });
      alert("Location updated successfully!");
      setUpdateForm(false);
      await fetchShipments();
      setLoc("");
      setUpdateId("");
    } catch (err) {
      alert("Failed to update location. Please try again.");
      return;
    }
  };
  return (
    <>
    {updateForm && (
        <div className="form-container top-50">
          <div className="form-outer-div">
            <h2>Update Loctaion</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-div">
                <input
                  type="text"
                  placeholder="location"
                  value={loc.trim()}
                  onChange={(e) => {
                    setLoc(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-btn-div">
                <button
                  type="button"
                  className="form-btn bg-red-500"
                  onClick={() => setUpdateForm(false)}
                >
                  Close
                </button>
                <button
                  className="form-btn bg-blue-500"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </>
  );
};

export default UpdateLoc;
