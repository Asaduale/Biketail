import React from 'react';
import { Grid }  from '@mui/material';
import SignupForm from './SignupForm';
import '../css/main.css';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid container alignItems='center' justifyContent='center' direction='column' >
                <Grid item>
                    <SignupForm {...this.props} app={this.props.app}/>
                </Grid>
                <Grid item>
                    <div className='linkContainer'>
                    <a href='/login'>Already have an account? Log in here.</a>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
