import React from 'react';
import '../css/main.css'
import { Box, TextField, Button, Typography } from '@mui/material';
import { signup } from "../../actions/user";
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/signup');
        this.state = {
            email: '',
            name: '',
            password1: '',
            password2: ''
        }
        this.signupUser = this.signupUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    signupUser() {
        this.props.history.push('/');
        signup(this, this.props.app);
    }
    // handleSubmit(e) {
    //     /** No functionality for signup at the moment. everything will be sent to backend and verified there */
    //     const {first_name, last_name, email, password1, password2 } = this.state;
    // }
    render() {
        const { app } = this.props;
        const { name, email, password1, password2 } = this.state;
        return (
            <div>
                <Box component='form' className='auth' sx={{ margin: '50% auto',}} onSubmit={() => this.signupUser()}>
                    <Typography variant='h3' className='auth-header'>Biketail</Typography>
                    <Typography variant='h6'>Create a personal account</Typography>
                    <Box sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }}}>
                    <div className='form-group'>
                        <TextField required variant='outlined' name='email' type='email' label='Email' value={email} onChange={this.handleInputChange} />
                    </div>
                    </Box>
                    <Box sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }}}>
                    <div className='form-group'>
                        <TextField required variant='outlined' name='name' type='text' label='Name to display' value={name} onChange={this.handleInputChange} />
                    </div>
                    </Box>
                    <Box sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }}}>
                    <div className='form-group'>
                        <TextField required variant='outlined' name='password1' type='password' label='Password' value={password1} onChange={this.handleInputChange} />
                    </div>
                    <div className='form-group'>
                        <TextField required variant='outlined' name='password2' type='password' label='Confirm password' value={password2} onChange={this.handleInputChange} />
                    </div>
                    </Box>
                    <Button  type='submit' variant='contained' sx={{backgroundColor: 'black', '&:hover': { backgroundColor: 'gray'}}} onClick={() => this.signupUser()}>Sign up</Button>
                </Box>
            </div>
        );
    }
}