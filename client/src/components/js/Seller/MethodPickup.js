import React from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import AlgoliaPlaces from 'algolia-places-react';
import { buyer_pickup_transaction_options } from '../../../lib/global_bike_details';

export default function MethodPickup(props) {

  function handleChange(newDetails){
    props.handleDetails(newDetails)
  }
  function handleLocationChange(newDetails){
    props.handleLocation(newDetails)
  }
  return (
    <div>
      <div className='places-container'>
      <p>You'll have a chance to set a meeting time after a buyer reaches out to you.</p>
      <AlgoliaPlaces
        placeholder='Enter pickup location (postal code)'
        required
        onChange={({ query, rawAnswer, suggestions, suggestonIndex }) => 
        handleLocationChange(query)}

        // onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
        //   console.log('Fired when suggestion selected in the dropdown or hint was validated.')}

        onSuggestions={({ rawAnswer, query, suggestions }) => 
          console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}

        onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
          console.log('Fired when arrows keys are used to navigate suggestions.')}

        onClear={() => 
          console.log('Fired when the input is cleared.')}

        onLimit={({ message }) => 
          console.log('Fired when you reached your current rate limit.')}

        onError={({ message }) => 
          console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
      /></div>

      <h3>Payment method</h3>
      <p>You'll handle the payment directly with the buyers. They'll be notified of your preferred method.</p>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="etransfer"
        name="radio-buttons-group"
      >
        {buyer_pickup_transaction_options.map((option) => (
          <FormControlLabel 
            value={option} 
            control={<Radio/>} 
            label={option}
            onChange={(event) => handleChange(event.target.value)}
          />
        ))}
      </RadioGroup>
    </div>
  )
}
