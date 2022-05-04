import React from 'react';
import {Box, TextField, IconButton, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../css/main.css';


export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.query.length > 0 ?  this.props.query : '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e) {
        const {value} = e.target;
        this.setState({search: value});
    };
    handleSubmit(e) {
        const { search } = this.state;
        const { for_page } = this.props;
        if (search.length > 0) {
            this.props.history.push(`/${for_page}/${this.state.search}`);
        } else {
            this.props.history.push(`/${for_page}`);
        }
    }
    render() {
        const {for_page} = this.props;
        const { search } = this.state;
        return (
            <Box
                component="form"
                className='search-bar'
                sx={{'& > :not(style)': { ml: 20, mr: 20, mt: 10, mb: 10, width: '100ch' },}}
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmit}>

                {for_page === 'rent' &&
                    <TextField label="Search for a bike to rent" variant="outlined" onChange={this.handleInputChange} placeholder='Enter name, model, or brand' value={search}
                            InputProps={{ startAdornment: <InputAdornment position='start'><IconButton size="small"><SearchIcon/></IconButton></InputAdornment>}}/>}
                {for_page === 'buy' &&
                    <TextField label="Search for a bike to buy" variant="outlined" onChange={this.handleInputChange} placeholder='Enter name, model, or brand' value={search}
                            InputProps={{ startAdornment: <InputAdornment position='start'><IconButton size="small"><SearchIcon/></IconButton></InputAdornment>}}/>}
                {for_page === 'adminUsersList' &&
                    <TextField label="Search for a user to view (Admin Mode)" variant="outlined" onChange={this.handleInputChange} value={search} placeholder='Enter name, email, or user ID'
                            InputProps={{ startAdornment: <InputAdornment position='start'><IconButton size="small"><SearchIcon/></IconButton></InputAdornment>}}/>}
                {for_page === 'adminBikesList' &&
                    <TextField label="Search for a bike to view (Admin mode)" variant="outlined" onChange={this.handleInputChange} placeholder='Enter name, model, brand, or bike ID' value={search}
                            InputProps={{ startAdornment: <InputAdornment position='start'><IconButton size="small"><SearchIcon/></IconButton></InputAdornment>}}/>}
                {for_page === 'rentedBikes' &&
                    <TextField label="Search for a rented bike" variant="outlined" onChange={this.handleInputChange} value={search}
                            InputProps={{ startAdornment: <InputAdornment position='start'><IconButton size="small"><SearchIcon/></IconButton></InputAdornment>}}/>}
                {for_page === 'purchase-history' &&
                    <TextField label="Search for a previoius purchase" variant="outlined" onChange={this.handleInputChange} placeholder='Enter name, model, or brand' value={search}
                            InputProps={{ startAdornment: <InputAdornment position='start'><IconButton size="small"><SearchIcon/></IconButton></InputAdornment>}}/>}
            </Box>
        );
    }
  }
  