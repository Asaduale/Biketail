import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Slider, FormControl, InputLabel, Select, MenuItem, Autocomplete, ToggleButton, ToggleButtonGroup, FilledInput, InputAdornment } from '@mui/material';
import ImageDrop from './ImageDrop';
import * as options from '../../../lib/global_bike_details';

export default function BikeDetailsForm(props) {
    const { sell, rental } = props;
    function handleChangeType(newType){props.handleType(newType)}
    function handleChangeFrame(newSize){props.handleFrameSize(newSize)}
    function handleChangeWheel(newSize){props.handleWheelSize(newSize)}
    function handleChangeAge(newAge){props.handleAge(newAge)}
    function handleChangeBrand(newBrand){props.handleBrand(newBrand)}
    function handleChangeModel(newModel){props.handleModel(newModel)}
    function handleChangeColor(newColor){props.handleColor(newColor)}
    function handleChangeCondition(newCondition){props.handleCondition(newCondition)}
    function handleChangeTitle(newTitle){props.handleTitle(newTitle)}
    function handleChangeInformation(newInformation){props.handleInformation(newInformation)}
    function handleChangeMaterial(newMaterial){props.handleMaterial(newMaterial)}
    function handleChangeSuspension(newSuspension){props.handleSuspension(newSuspension)}
    function handleChangeBrake(newBrake){props.handleBrake(newBrake)}
    function handleChangeInformation(newInformation){props.handleInformation(newInformation)}
    function handleChangeStock(newStock){props.handleStock(newStock)}

    return (
    <div className='section'>
        <h1>Bike Details</h1>
        <h3>Overview</h3>
        <div className='overview'>
            <TextField 
                fullWidth
                id="outlined-basic" 
                label="Give your listing a clear title..." 
                variant="filled"
                required
                onChange={(event) => handleChangeTitle(event.target.value)}/>
            <TextField 
                fullWidth
                id="outlined-basic" 
                label="...and a detailed description. Make it stand out!"
                multiline 
                rows={4}
                variant="filled"
                required
                onChange={(event) => handleChangeInformation(event.target.value)}
            />
            {sell && (<TextField
                        fullWidth
                        type='number'
                        variant="filled"
                        id="outlined-basic"
                        required
                        InputProps={{
                            inputProps: { 
                                min: 1 
                            }
                        }}
                        label="How many of this bike do you currently have in stock?"
                        onChange={(event) => handleChangeStock(event.target.value)}
                    />)
            }
        </div>
        <h3>Type</h3>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options.type_options}
            renderInput={(params) => <TextField {...params} label="Search type" />}
            onChange={(event, value) => handleChangeType(value)}
            required
        />

        <h3>Size</h3>
        <div className='select-container'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Frame Size</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Frame Size"
                    onChange={(event) => handleChangeFrame(event.target.value)}
                    required
                >
                    {options.frame_size_options.map((size) => (
                            <MenuItem value={size}>{size}</MenuItem>     
                        ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Wheel Size</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Wheel Size"
                    onChange={(event) => handleChangeWheel(event.target.value)}
                    required
                >
                    {options.wheel_size_options.map((size) => (
                            <MenuItem value={size}>{size}</MenuItem>     
                        ))}
                </Select>
            </FormControl>
        </div>

        <h3>Age</h3>
        <div className='slider-container'>
            <Slider
                required
                aria-label="Temperature"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={10}
                onChange={(event) => handleChangeAge(event.target.value)}
            />
        </div>

        <h3>Model</h3>
        <div className='select-container'>
            <Autocomplete
                required
                disablePortal
                id="combo-box-demo"
                options={options.brand_options}
                renderInput={(params) => <TextField {...params} label="Search brands" />}
                onChange={(event, value) => handleChangeBrand(value)}
            />
            <TextField 
                required
                id="outlined-basic" 
                label="Model" 
                variant="outlined" 
                onChange={(event) => handleChangeModel(event.target.value)}/>
        </div>
        
        <h3>Other</h3>
        <div className='select-container'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Color"
                    onChange={(event) => handleChangeColor(event.target.value)}
                >
                    {options.color_options.map((color) => (
                        <MenuItem value={color}>{color}</MenuItem>     
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Condition"
                    onChange={(event) => handleChangeCondition(event.target.value)}
                    required
                >
                    {options.condition_options.map((condition) => (
                            <MenuItem value={condition}>{condition}</MenuItem>     
                        ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Material</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Condition"
                    onChange={(event) => handleChangeMaterial(event.target.value)}
                >
                    {options.material_options.map((material) => (
                            <MenuItem value={material}>{material}</MenuItem>     
                        ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Suspension</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Condition"
                    onChange={(event) => handleChangeSuspension(event.target.value)}
                >
                    {options.suspension_options.map((suspension) => (
                            <MenuItem value={suspension}>{suspension}</MenuItem>     
                        ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brake Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Condition"
                    onChange={(event) => handleChangeBrake(event.target.value)}
                >
                    {options.brake_type_options.map((brake) => (
                            <MenuItem value={brake}>{brake}</MenuItem>     
                        ))}
                </Select>
            </FormControl>
        </div>

        <h3>Upload Images</h3>
        <p>Showcase up to 5 pictures of your bike</p>
        <ImageDrop></ImageDrop>
    </div>
    );
}