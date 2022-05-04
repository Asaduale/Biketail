import React from "react";
import { Link } from 'react-router-dom';
import { logout } from "../../actions/user";


export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/login');
        logout(this.props.app);
    }
    render() {
        return(
            <div></div>
        )
    }
}