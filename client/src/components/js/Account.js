import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/Account.css';
import { Button } from '@mui/material';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/account');
    }
    render() {
        const { currentUser, currentUserName, currentUserRole } = this.props.appState;
        if (currentUser) {
            return(
                <div className='account'>
                    <h2>My Account</h2>
                    <p><b>Name: </b> {currentUserName}</p>
                    <p><b>Email address:</b>{` ${currentUser} (not displayed to other users)`}</p>
                    <div className='account-buttons'>
                        <Button variant="contained" component={Link} to="/listings">Your Listings</Button>
                        <Button variant="contained" component={Link} to="/saved">Your Saved Bikes</Button>
                        <Button variant="contained" component={Link} to="/purchase-history">Your Purchase Bikes</Button>
                        <Button variant="contained" component={Link} to="/portal">Renter Portal</Button>
                        {currentUserRole === 1 && <Button variant="contained" component={Link} to="/adminUsersList">Admin User List</Button>}
                        {currentUserRole === 1 && <Button variant="contained" component={Link} to="/adminBikesList">Admin Bike List</Button>}
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <h2>Account</h2>
                    <p>You are not logged in.</p>
                </div>
            )
        }
    }
}
