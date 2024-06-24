import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

function EditRoom() {
    const[room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
      })
    
      const[imagePreview, setImagePreview] = useState("")
      const[successMessage, setSuccessMessage] = useState("")
      const[errorMessage, setErrorMessage] = useState("")

      const {roomId} = useParams()

        const handleImageChange = (e) => {
            const selectedImage = e.target.files[0]
            setRoom({ ...room, photo: selectedImage })
            setImagePreview(URL.createObjectURL(selectedImage))
        }

        const handleInputChange = (event) => {
            const { name, value } = event.target
            setRoom({ ...room, [name]: value })
        }
       
        useEffect(() => {
            const fetchRoom = async () => {
                try{
                  const roomData = await getRoomById(roomId)
                  setRoom(roomData)
                  setImagePreview(roomData.photo)
                }catch(error){
                    console.error(error)
                }
            }
            fetchRoom()
        }, [roomId])
        
  const handleSubmit = async (event) => {
    e.preventDefault()
    try{
          const response = await updateRoom(roomId, room)
          if(response.status === 200){
            setSuccessMessage("Room updated successfully!")
            const updatedRoomData = await getRoomById(roomId)
            setRoom(updatedRoomData.photo)
            setImagePreview("updatedRoomData.photo")
            setErrorMessage("")
          } else{
            setErrorMessage("Error updating room")
          }
    }catch(error){
        console.error(error)
        setErrorMessage(error.message)
    }
    
  }

  return (
    <div>
        <section className='container, mt-5 mb-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                   <h2 className='mt-5 mb-2'>Add a New Room</h2>
                   {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}


                   <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='roomType' className='form-label hotel-color'>  Room Type </label>
                        <input
									required
									type="text"
									className="form-control"
									id="roomType"
									name="roomType"
									value={room.roomType}
									onChange={handleInputChange}
								/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='roomPrice' className='form-label'>   Room Price </label>
                        <input
									required
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={room.roomPrice}
									onChange={handleInputChange}
								/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='photo' className='form-label'>  Room Photo </label>
                        <input id="photo" name='photo' type='file' className='form-control' onChange={handleImageChange} />
                        {imagePreview && (
                            <img src={imagePreview}
                            alt='Preview Room Photo'
                            style={{maxWidth: "400px", maxHeight: "400px"}} 
                            className='mb-3'/>
                        )}
                    </div>
                    <div className='d-grid d-md-flex mt-2'>
                        <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5' > back </Link>
                        <button type='submit' className='btn btn-outline-warning'> Edit Room </button>
                       </div>
                   </form>
                </div>
            </div>
        </section>

    </div>
  )
}

export default EditRoom