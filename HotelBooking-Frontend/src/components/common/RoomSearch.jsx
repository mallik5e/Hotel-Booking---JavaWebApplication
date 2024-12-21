import React, { useState } from 'react'
import { getAvailableRooms } from '../utils/ApiFunctions' 
import moment from 'moment'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {
    const[searchQuery, setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate : "",
        roomType: ""
    })
    const[errorMessage, setErrorMessage] = useState("")
    const[availableRooms, setAvailableRooms] = useState([])
    const[isLoading, setIsLoading] = useState(false)

const handleSearch = (e)=> {
    e.preventDefault();
    const checkInMoment = moment(searchQuery.checkInDate)
    const checkOutMoment = moment(searchQuery.checkOutDate)
    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
        setErrorMessage("Please enter valid dates")
        return
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
        setErrorMessage("Check-out date must be after check-in date")
        return
    }
    setIsLoading(true)
    getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
        .then((response) => {
            setAvailableRooms(response.data)
            setTimeout(() => setIsLoading(false), 2000)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
} 

const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchQuery({ ...searchQuery, [name]: value })
    const checkInDate = moment(searchQuery.checkInDate)
    const checkOutDate = moment(searchQuery.checkOutDate)
    if (checkInDate.isValid() && checkOutDate.isValid()) {
        setErrorMessage("")
    }
}

const handleClearSearch = () => {
    setSearchQuery({
        checkInDate : "",
        checkOutDate : "",
        roomType : ""
    })
    setAvailableRooms([])
}

  return (
    <> 
    <Container className='mt-5 mb-5 py-5 shadow'>
        <Form onSubmit={handleSearch}>
            <Row className='justify-content-center'>
                <Col xs={12} md={3}>
                    <Form.Group controlId='checkInDate'>
                        <Form.Label>Check-In date</Form.Label>
                        <Form.Control type='date' name='checkInDate' value={searchQuery.checkInDate} onChange={handleInputChange} min={moment().format("YYYY-MM-DD")}/>
                    </Form.Group>
                </Col> 
                <Col xs={12} md={3}>
                    <Form.Group controlId='checkOutDate'>
                        <Form.Label>Check-Out date</Form.Label>
                        <Form.Control type='date' name='checkOutDate' value={searchQuery.checkOutDate} onChange={handleInputChange} min={moment().format("YYYY-MM-DD")}/>
                    </Form.Group>
                </Col> 
                <Col xs={12} md={3}>
                <Form.Group controlId="roomType">
								<Form.Label>Room Type</Form.Label>
								<div className="d-flex">
									<RoomTypeSelector
										handleRoomInputChange={handleInputChange}
										newRoom={searchQuery}
									/>
									<Button variant="secondary" type="submit" className="ml-2">
										Search
									</Button>
								</div>
							</Form.Group>
                </Col> 
            </Row>
        </Form>

       {isLoading ? (
        <p className='mt-4'>finding available rooms...</p>
       ) : availableRooms ? (
        <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch}/>
       ) : (
        <p className='mt-4'>No rooms available for the selected dates and room type</p>
       )}
       {errorMessage  &&  <p className='text-danger'>{errorMessage}</p>}

    </Container>

    </>
  )
}

export default RoomSearch