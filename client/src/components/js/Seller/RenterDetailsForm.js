import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, Input, InputAdornment } from '@mui/material';
import * as options from '../../../lib/global_bike_details';
import AlgoliaPlaces from 'algolia-places-react';

export default function RenterDetailsForm(props) {
    function handleChangePrice(newPrice){props.handlePrice(newPrice)}
    function handleChangeLocation(newLocation){props.handleLocation(newLocation)}
    function handleChangeStartDateTime(newStartDateTime){props.handleStartDateTime(newStartDateTime)}
    function handleChangeEndDateTime(newEndDateTime){props.handleEndDateTime(newEndDateTime)}
    function handleChangePickUpInformation(newPickUpInfo){props.handlePickUpInformation(newPickUpInfo)}


    return (
    <div className='section'>
        <h1>Renting Details</h1>
        <h3>Dates</h3>
        <div className='trip-dates'>
            <TextField
                id="datetime-local"
                label="Starting Available Date"
                type="datetime-local"
                defaultValue="2022-03-06T10:30"
                fullWidth
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(event) => {
                    console.log("Start date time is " + event.target.value)
                    handleChangeStartDateTime(event.target.value)
                }}
            />
            <TextField
                id="datetime-local"
                label="Ending Available Date"
                type="datetime-local"
                defaultValue="2022-03-11T10:30"
                fullWidth
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(event) => {
                    console.log("End date time is " + event.target.value)
                    handleChangeEndDateTime(event.target.value)
                
                }}

            />
        </div>
        <h3>Pickup and Return</h3>
        <AlgoliaPlaces
        placeholder='Enter pickup and return location'

        // options={{
        // appId: 'my-app-id',
        // apiKey: 'sharing-is-caring',
        // language: 'sv',
        // countries: ['se'],
        // type: 'city',
        // // Other options from https://community.algolia.com/places/documentation.html#options
        // }}

        onChange={({ query, rawAnswer, suggestions, suggestonIndex }) => 
        handleChangeLocation(query)}

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
        />  

        <h3>Pricing</h3>
        <div className='pricing-block'>
            <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
                id="standard-adornment-amount"
                // value={values.amount}
                onChange={(event) => handleChangePrice(event.target.value)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            </FormControl>
            <p className='description'>Biketail lets you charge by the day</p>
        </div>

        <h3>Pickup Details</h3>
        <TextField 
            fullWidth
            id="outlined-basic" 
            label="Pickup information you'd like to share"
            multiline 
            rows={4}
            variant="filled" 
            onChange={(event) => handleChangePickUpInformation(event.target.value)}
        />
    </div>
    )
}
