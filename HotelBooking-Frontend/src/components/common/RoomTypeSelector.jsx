import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data || []); // Ensure fallback if no data
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  const handleSelectChange = (e) => {
    const { value, name } = e.target;
    if (value === "Add New") {
      setShowNewRoomTypeInput(true);
    } else {
      handleRoomInputChange({ target: { name, value } });
      setShowNewRoomTypeInput(false); // Hide input if not "Add New"
    }
  };

  return (
    <div>
      <select
        required
        className="form-select"
        name="roomType"
        onChange={handleSelectChange}
        value={newRoom.roomType}
      >
        <option value="">Select a room type</option>
        <option value="Add New">Add New</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      {showNewRoomTypeInput && (
        <div className="mt-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter New Room Type"
              value={newRoomType}
              onChange={handleNewRoomTypeInputChange}
            />
            <button
              className="btn btn-hotel"
              type="button"
              onClick={handleAddNewRoomType}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTypeSelector;
