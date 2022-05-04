import React from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ship_to_buyer_transaction_options } from '../../../lib/global_bike_details';

export default function MethodShip(props) {
  
  function handleChange(newDetails){
    props.handleDetails(newDetails)
  }

  return (
    <div>
      <p>You'll be shipping your bike directly to a buyer. Head over to Biketail's <a href="https://google.com" target="_blank">shipping hub</a> to get everything you need for your bike to arrive safely.</p>
      <h3>How much will buyers pay for shipping?</h3>
      <RadioGroup
        required
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="free"
        name="radio-buttons-group"
      >
        {ship_to_buyer_transaction_options.map((option) => (
          <FormControlLabel
            value={option} 
            control={<Radio/>} 
            label={option}
            onChange={(event) => handleChange(event.target.value)}
          />
        ))}
        {/* <FormControlLabel value="free" control={<Radio />} label="Free Shipping: you cover all costs" />
        <FormControlLabel value="user" control={<Radio />} label="Buyer Pays All: they'll find out total shipping costs during purchasing" />
        <FormControlLabel value="fixed" control={<Radio />} label="Buyer Pays Fixed Fee: set a flat shipping rate that the buyer will pay for" /> */}
      </RadioGroup>
    </div>
  )
}
