import React, {useState} from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import { Box, Paper, Typography, TextField, InputAdornment, Checkbox, Button, FormControl, InputLabel, Select, MenuItem, ListSubheader, List, ListItemText } from '@mui/material';

import { type_options, color_options, condition_options, suspension_options, material_options, brake_type_options, frame_size_options, wheel_size_options, brand_options, fulfillment_options } from '../../lib/global_bike_details';

import OutlinedInput from '@mui/material/OutlinedInput';

const filterRow = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: theme.spacing(8),
    variant: "outlined", 
    // color: theme.palette.text.secondary,
  }));


//Stuff thats required for the form 
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function Filter(props) {
  const [min_price, setValueMin] = React.useState();
  const [max_price, setValueMax] = React.useState();
  const [bikeType, setBikeType] = React.useState([]);
  const [bikeColor, setBikeColor] = React.useState([]);
  const [bikeCondition, setBikeCondition] = React.useState([]);
  const [bikeBrand, setBikeBrand] = React.useState([]);
  const [bikeFrameSize, setBikeFrameSize] = React.useState([]);
  const [bikeWheelSize, setBikeWheelSize] = React.useState([]);


  const applyFilter = (event) => {
    

    // ***** Javascript link for applying filter  *****

  };

  const handleSelectChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'color') {
      setBikeColor(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    } else if (name === 'type') {
      setBikeType(
        typeof value === 'string' ? value.split(',') : value,
      );
    } else if (name === 'frame_size') {
      setBikeFrameSize(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    } else if (name === 'wheel_size') {
        setBikeWheelSize(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    } else if (name === 'brand') {
        setBikeBrand(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (name === 'min_price') {
      setValueMin(value);
    } else if (name === 'max_price') {
      setValueMax(value);
    }
  };

  const {for_page} = props;
  return (
    <ThemeProvider theme={filterRow}>
        <List
        sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', p: 2}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                <Typography variant="h6">
                Filters:
                </Typography>
            </ListSubheader>
        }>
        <Box component='form'>
          <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="multipletype-checkbox-label">Type</InputLabel>
          <Select
            labelId="multipletype-checkbox-label"
            multiple
            name={'type'}
            value={bikeType}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {type_options.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={bikeType.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="bike-color-checkbox">Color</InputLabel>
          <Select
            labelId="bike-color-checkbox"
            multiple
            name='color'
            value={bikeColor}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Color" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {color_options.map((color) => (
              <MenuItem key={color} value={color}>
                <Checkbox checked={bikeColor.indexOf(color) > -1} />
                <ListItemText primary={color} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="bike-frame-checkbox">Frame Size</InputLabel>
          <Select
            labelId="bike-frame-checkbox"
            multiple
            name={'frame_size'}
            value={bikeFrameSize}
            onChange={handleSelectChange}
            input={<OutlinedInput label="FrameSize" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {frame_size_options.map((frame) => (
              <MenuItem key={frame} value={frame}>
                <Checkbox checked={bikeFrameSize.indexOf(frame) > -1} />
                <ListItemText primary={frame} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="bike-wheel-checkbox">Wheel Size</InputLabel>
          <Select
            labelId="bike-wheel-checkbox"
            multiple
            value={bikeWheelSize}
            name='wheel_size'
            onChange={handleSelectChange}
            input={<OutlinedInput label="WheelSize" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {wheel_size_options.map((wheel) => (
              <MenuItem key={wheel} value={wheel}>
                <Checkbox checked={bikeWheelSize.indexOf(wheel) > -1} />
                <ListItemText primary={wheel} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="brand-checkbox">Brand</InputLabel>
          <Select
            labelId="brand-checkbox"
            multiple
            value={bikeBrand}
            name='brand'
            onChange={handleSelectChange}
            input={<OutlinedInput label="Brand" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {brand_options.map((brand) => (
              <MenuItem key={brand} value={brand}>
                <Checkbox checked={bikeBrand.indexOf(brand) > -1} />
                <ListItemText primary={brand} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box  sx={{ '.MuiTextField-root': { m: 1, width: '10ch' }}}>
            <div className='form-group'>
              
              <TextField variant='outlined' name='min_price' type='number' value={min_price} label='min' onChange={handleInputChange}
                         InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment>}}/>
              <TextField variant='outlined' name='max_price' type='number' value={max_price} label='max' onChange={handleInputChange}
                         InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment>}}
                         helperText={for_page === 'renter' ? '(by day)' : 'total'}/>
            </div>
        </Box>
        <Button variant='contained' sx={{backgroundColor: '#0051c3', '&:hover': { backgroundColor: 'navy'}}} onClick={applyFilter}>
            Apply
        </Button> 
        </Box>
        </List>
    </ThemeProvider>

  );
}
