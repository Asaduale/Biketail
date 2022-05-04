import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

// need to grab bike and transactiond details from state
const bikeDetails = {
  type: 'Mountain',
  frameSize: 'M',
  wheelSize: 'L',
  age: 2,
  brand: 'Cannondale',
  images: 'array'
}

// details will have different forms of data e.g. pickup date, shipping cost details
const transactionDetails = {
  type: 'Buyer Pickup',
  details: 'flexible data'
}

export default function Review() {
  return (
    <div>
      <h1>Review your post</h1>

      <h3>Bike Details</h3>
      <p>Bike Type: {bikeDetails.type}</p>
      <p>Frame Size: {bikeDetails.frameSize}</p>
      <p>Wheel Size: {bikeDetails.wheelSize}</p>
      <p>Bike Age: {bikeDetails.age}</p>
      <p>Brand: {bikeDetails.brand}</p>
      <p>Images: {bikeDetails.images}</p>

      <h3>Transaction Details</h3>
      <p>Selling Method: {transactionDetails.type}</p>
      <p>{transactionDetails.details}</p>
      
    </div>
  );
}