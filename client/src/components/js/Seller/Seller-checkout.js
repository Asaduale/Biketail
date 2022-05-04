import React, { useState } from 'react';
import Button from '@mui/material/Button';
import BikeDetailsForm from './BikeDetailsForm';
import TransactionDetailsForm from './TransactionDetailsForm';
import '../../css/Seller/image.css';
import '../../css/Seller/seller.css';
import { Link } from 'react-router-dom';
import RenterDetailsForm from './RenterDetailsForm';
import { postListingForSale} from "../../../actions/sale";
import { postListingForRent} from "../../../actions/rent";


const Seller = (props) => {
  // Seller or Rental state
  const [rental, setRental] = useState(false)
  const [sell, setSell] = useState(false)

  // Bike Details state
  const [type, setType] = useState('')
  const [stock, setStock] = useState(1)
  const [frameSize, setFrameSize] = useState('')
  const [wheelSize, setWheelSize] = useState('')
  const [age, setAge] = useState('')
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [condition, setCondition] = useState('')
  const [model, setModel] = useState('')
  const [title, setTitle] = useState('')
  const [information, setInformation] = useState('')
  const [price, setPrice] = useState('')
  const [material, setMaterial] = useState('')
  const [suspension, setSuspension] = useState('')
  const [brake, setBrake] = useState('')


  // Transaction Details state
  const [method, setMethod] = useState('')
  const [transDetails, setTransDetails] = useState('')

  // Renter Details state
  const [pickUpInfo, setPickUpInfo] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')


  const [location, setLocation] = useState('')
  
  // Handlers for bike detail inputs
  function handleType(newType) {setType(newType)}
  function handleStock(newStock) {setStock(newStock)}
  function handleFrameSize(newSize) {setFrameSize(newSize)}
  function handleWheelSize(newSize) {setWheelSize(newSize)}
  function handleAge(newAge) {setAge(newAge)}
  function handleBrand(newBrand) {setBrand(newBrand)}
  function handleColor(newColor) {setColor(newColor)}
  function handleCondition(newCondition) {setCondition(newCondition)}
  function handleModel(newModel) {setModel(newModel)}
  function handlePrice(newPrice) {setPrice(newPrice)}
  function handleTitle(newTitle) {setTitle(newTitle)}
  function handleInformation(newInformation) {setInformation(newInformation)}
  function handleMaterial(newMaterial) {setMaterial(newMaterial)}
  function handleSuspension(newSuspension) {setSuspension(newSuspension)}
  function handleBrake(newBrake) {setBrake(newBrake)}


  // Handlers for transaction detail inputs
  function handleMethod(newMethod) {setMethod(newMethod)}
  function handleDetails(newDetails) {setTransDetails(newDetails)}


  // Handlers for renter detail inputs
  function handlePickUpInformation(newPickUpInfo) {setPickUpInfo(newPickUpInfo)}
  function handleStartDateTime(newStartDateTime) {setStartDateTime(newStartDateTime)}
  function handleEndDateTime(newEndDateTime) {setEndDateTime(newEndDateTime)}
  function handleLocation(newLocation) {setLocation(newLocation)}


  // Function to add bike to global array
  function addBike(){
    // send to for sale or for rent depending on state
    const { app } = props;
    if (sell) {
      const { bikes_for_sale, currentUserID} = props.appState;
      const copy = Object.assign([], bikes_for_sale);
      
      const newBike = {
        name: title,
        stock: stock,
        banned: false,
        model: model,
        condition: condition,
        color: color,
        type: type,
        material: material,
        frame_size: frameSize,
        wheel_size: wheelSize,
        suspension: suspension,
        brake_type: brake,
        age: age,
        brand: brand,
        images: [],
        selling_method: method,
        transaction_details: transDetails,
        price: price,
        location: location,
        saved_by: [],
        ratings: [],
        avg_ratings: 0,
        information: information
      }
      

      var result = postListingForSale(newBike, app);

      console.log("result is " + result)

    } else if (rental) {
      const { bikes_for_rent, user, currentUserID} = props.appState;
      console.log("User is " + JSON.stringify(currentUserID))     
      const copy = Object.assign([], bikes_for_rent);
      console.log("start_date is " + startDateTime + " end_date " + endDateTime)
      
      const newBike = {
        status: "Available",
        name: title,
        model: model,
        condition: condition,
        banned: false,
        color: color,
        type: type,
        material: material,
        frame_size: frameSize,
        wheel_size: wheelSize,
        suspension: suspension,
        brake_type: brake,
        age: age,
        brand: brand,
        images: [],
        location: location,
        saved_by: [],
        information: information,
        days: 0,
        start_date: startDateTime,
        end_date: endDateTime,
        price_by_day: price,
        ratings: [],
        avg_ratings: 0,
        pickup_details: pickUpInfo,
        bookings: []
      }
  

      var result = postListingForRent(newBike, app);

      console.log("result is " + result)
    }
    
  }

  return (
    <div>
      {!sell && !rental ? <div className='no-option-selected'> 
      <div className='type-container'>
            <Button onClick={() => {
                setSell(!sell)
                setRental(false)
            }} 
            variant={sell ? "contained" : "outlined"}>Sell a bike</Button>
            <Button onClick={() => {
                setSell(false)
                setRental(!rental)
            }} 
            variant={rental ? "contained" : "outlined"}>Rent out a bike</Button>   
        </div>
      </div>: <div className="option-selected">
      <div className='type-container'>
            <Button onClick={() => {
                setSell(!sell)
                setRental(false)
            }} 
            variant={sell ? "contained" : "outlined"}>Sell a bike</Button>
            <Button onClick={() => {
                setSell(false)
                setRental(!rental)
            }} 
            variant={rental ? "contained" : "outlined"}>Rent out a bike</Button>   
        </div>
      </div>
      }
              
      <div className='form-container'>
        {(sell || rental) && 
        <BikeDetailsForm
          sell={sell}
          rental={rental}
          handleType={handleType} 
          handleFrameSize={handleFrameSize}
          handleWheelSize={handleWheelSize}
          handleAge={handleAge}
          handleModel={handleModel}
          handleBrand={handleBrand}
          handleColor={handleColor}
          handleCondition={handleCondition}
          handleTitle={handleTitle}
          handleStock={handleStock}
          handleInformation={handleInformation}
          handleMaterial={handleMaterial}
          handleSuspension={handleSuspension}
          handleBrake={handleBrake}
        />}

        {sell && <TransactionDetailsForm 
          handleMethod={handleMethod} 
          handleDetails={handleDetails}
          handlePrice={handlePrice}
          handleLocation={handleLocation}
        />}

        {rental && <RenterDetailsForm
          handlePrice={handlePrice}
          handleLocation={handleLocation}
          handlePickUpInformation={handlePickUpInformation}
          handleStartDateTime={handleStartDateTime}
          handleEndDateTime={handleEndDateTime}
        />}
        
        {(sell || rental) &&
          <div className='submit-button'>
          <Link to='/listings'>
            <Button type='submit' variant='outlined' onClick={() => addBike()}>Submit</Button>
          </Link>
          </div>}
      
      </div>
    </div>
  );
}

export default Seller;