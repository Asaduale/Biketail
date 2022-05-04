import React from 'react';
import { Typography, ToggleButton, ToggleButtonGroup, Link } from '@mui/material';
import '../css/Listings.css';
import BikeCards from './BikeCards';

export default class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/listings');
        this.state = {
            toggle: 'sell'
        }
        this.handleToggleChange = this.handleToggleChange.bind(this);
    }
    handleToggleChange(e) {
        const { value } = e.target;
        this.setState({toggle: value});
    }
    render() {
        const { user } = this.props.appState;
        const { toggle } = this.state;
        return(
            <div>
                <div className='saved-container'>
                    <Typography variant='h3'>My Listings</Typography>
                    <ToggleButtonGroup value={toggle} size='large' exclusive onChange={this.handleToggleChange}>
                    <ToggleButton value='sell' key='sell'>
                        For Sale
                    </ToggleButton>
                    <ToggleButton value='rent' key='rent'>
                        For Rent
                    </ToggleButton>
                    </ToggleButtonGroup>
                    <div className='saved-cards-container'>
                        {toggle === 'sell' && <BikeCards {...this.props} for_page='listings_sell' query={''}/>}
                        {toggle === 'rent' && <BikeCards {...this.props} for_page='listings_rent' query={''}/>}
                    </div>
                </div>
            </div>
        );
    }
}
