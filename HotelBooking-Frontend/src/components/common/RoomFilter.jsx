import React, { useState } from 'react'

function RoomFilter({data, setFilteredData}) {
    const[filter, setFilter] = useState("")

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value 
    setFilter(selectedRoomType)
    const filteredRooms = data.filter((room) =>//filtering the room using filter().
    room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))//check roomTypes in room includes the selected roomType. if yes,filter.
    setFilteredData(filteredRooms)
  }
  const clearFilter = () => {//when clear the filter
    setFilter("")
    setFilteredData(data)
  }

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]//extract all the room type from database. 

  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>
            Filter rooms by type
        </span>
<select className='form-select' value={filter} onChange={handleSelectChange}>
    <option value={""}>select a room type to filter...</option>
    {roomTypes.map((type, index) => (
        <option key={index} value={String(type)}>{String(type)}</option>
    ))}

</select>
<button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default RoomFilter