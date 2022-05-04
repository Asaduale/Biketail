import React from "react";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from "../../actions/user";


export default class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button sx={{ color: 'white', display: 'block' }} style={{ color: 'black', textDecoration: 'none'}}><Link to={ `/logout`} style={{ color: 'black', textDecoration: 'none'}}>LOGOUT</Link></Button>
        )
    }
}