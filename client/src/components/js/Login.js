import React from 'react';
import { Grid }  from '@mui/material';
import LoginForm from './LoginForm';
import '../css/Login.css';
import Home from './Home';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.currentUser) {
            this.props.history.push('/login');
        } else {
            this.props.history.push('/account');
        }
    }
    render() {
        if (this.props.appState.currentUser) {
            return (<Home {...this.props} />)
        }
        return (
            <Grid container alignItems='center' justifyContent='center' direction='column' >
                <Grid item>    
                    <LoginForm {...this.props} app={this.props.app} />
                </Grid>
                <Grid item>
                    <div className='linkContainer'>
                    <a href='/signup'>No account? Sign up here.</a>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
