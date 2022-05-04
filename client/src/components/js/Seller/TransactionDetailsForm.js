import React, { useState } from 'react';
import MethodPickup from './MethodPickup';
import MethodShip from './MethodShip';
import MethodBiketail from './MethodBiketail';
import { FormControl, InputLabel, Select, MenuItem, Input, InputAdornment } from '@mui/material';
import * as options from '../../../lib/global_bike_details';

export default function TransactionDetailsForm(props) {
    const [method, setMethod] = useState('')
    function handleChangeMethod(newMethod) {
        props.handleMethod(newMethod)
        setMethod(newMethod)
    }
    function handleChangePrice(newPrice){props.handlePrice(newPrice)}


    return (
        <div className='section'>
        <h1>Transaction Details</h1>
        <h3>Pricing</h3>
        <div className='pricing-block'>
            <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
                required
                id="standard-adornment-amount"
                // value={values.amount}
                onChange={(event) => handleChangePrice(event.target.value)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            </FormControl>
            <p className='description'>Check out our <a>pricing guide</a> for advice</p>
        </div>
        <h3>How will you be selling this bike?</h3>
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select a selling option</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Select a selling option"
                    onChange={(event) => handleChangeMethod(event.target.value)}
                    required
                >
                    {options.selling_method_options.map((method) => (
                        <MenuItem value={method}>{method}</MenuItem>     
                    ))}
                </Select>
            </FormControl>
       
        <div className='conditional-transaction'>
            {method === options.selling_method_options[0] && <MethodPickup handleDetails={props.handleDetails} handleLocation={props.handleLocation}/>}
            {method === options.selling_method_options[1] && <MethodShip handleDetails={props.handleDetails}/>}
            {method === options.selling_method_options[2] && <MethodBiketail handleDetails={props.handleDetails}/>}
        </div>
    </div>
  );
}