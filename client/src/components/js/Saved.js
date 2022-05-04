import React from 'react';
import { Typography, ToggleButton, ToggleButtonGroup, Link } from '@mui/material';
import '../css/Saved.css';
import BikeCards from './BikeCards';

export default class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/saved');
        this.state = {
            toggle: 'on_sale'
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
                    <Typography variant='h3'>My Saved Bikes</Typography>
                    <ToggleButtonGroup value={toggle} size='large' exclusive onChange={this.handleToggleChange}>
                    <ToggleButton value='on_sale' key='on_sale'>
                        On Sale
                    </ToggleButton>
                    <ToggleButton value='rental' key='rental'>
                        Rental
                    </ToggleButton>
                    </ToggleButtonGroup>
                    <div className='saved-cards-container'>
                        {toggle === 'on_sale' && <BikeCards {...this.props} for_page='buyer_saved' query={''}/>}
                        {toggle === 'rental' && <BikeCards {...this.props} for_page='renter_saved' query={''}/>}
                    </div>
                </div>
            </div>
        );
    }
}
