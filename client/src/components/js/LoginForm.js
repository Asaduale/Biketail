import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import '../css/main.css';
import { login, updateLoginForm } from "../../actions/user";
// import AlertMessage from './AlertMessage';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push('/login');
        this.state = {
            email: "",
            password: "",
        }
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        this.props.history.push('/account');
        login(this, this.props.app);
    }

    // handleSubmit(e) {
    //     const { email, password } = this.state;
    //     const {bikes_for_rent, all_users} = this.props.appState;
    //     /* all of this data will be sent to and users will be authenticated in the backend*/
    //     if (email === '' || password === '') {
    //         this.setState({alert_message: `Fill in required fields.`});
    //     } else if (email === 'user@user.com' && password === 'user' && all_users[1].banned === false) {
    //         this.setState({email: '', password: '', alert_message: ''});
    //         const { setAppState } = this.props;
    //         setAppState({ logged_in: true, user: {uid: 0, email: email, is_admin: false, banned: all_users[1].banned, first_name: 'userf', last_name: 'userl', username: 'user', password: password, saved_rental_bikes: [1], saved_sale_bikes: [0], curent_rentals: [], purchased_bikes: []} });
    //         // redirect to the right page
    //     } else if (email === 'user2@user.com' && password === 'user2' && all_users[2].banned === false){
    //         this.setState({email: '', password: '', alert_message: ''});
    //         const { setAppState } = this.props;
    //         setAppState({ logged_in: true, user: {uid: 2, email: email, is_admin: false, banned: all_users[2].banned, first_name: 'Wiz', last_name: 'Khalifa', username: 'user2', password: password, saved_rental_bikes: [2, 1], saved_sale_bikes: [3], curent_rentals: []}, purchased_bikes: [] });
    //     } else if (email === 'admin@admin.com' && password === 'admin' && all_users[0].banned === false) {
    //         this.setState({email: '', password: '', alert_message: ''});
    //         const { setAppState } = this.props;
    //         setAppState({ logged_in: true, user: {uid: 1, email: email, is_admin: true, banned: all_users[0].banned, first_name: 'Gordon', last_name: 'Ramsay', username: 'admin', password: password, saved_rental_bikes: [], saved_sale_bikes: [], curent_rentals: bikes_for_rent.filter(bike => { return bike.id === 0; })  } });
    //         // redirect to the right page    
    //     } else if ( (email === 'admin@admin.com' && password === 'admin' && all_users[0].banned === true) ||  (email === 'user2@user.com' && password === 'user2' && all_users[2].banned === true) ||  ((email === 'user@user.com' && password === 'user' && all_users[1].banned === true)) ) {
    //         this.setState({alert_message: 'User has been banned. Please contact website administration for more details.'});
    //     }
    //     else {
    //         this.setState({alert_message: 'Email or password is incorrect.'});
    //     }
    // }

    render() {
        const { app } = this.props;
        const { email, password } = this.state;
        // const { email, password, alert_message } = this.state;
        // const have_alert = alert_message === '' ? false : true;
        return (
                <div>
                    <Box component='form' className='auth' sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }, margin: '50% auto',}} onSubmit={() => this.loginUser()}>
                        <Typography variant='h3' className='auth-header'>Biketail</Typography>
                        <Typography variant='h6'>Log in to account</Typography>
                        <div className='form-group'>
                            <TextField required variant='outlined' name='email' type='email' label='Email' value={email} onChange={e => updateLoginForm(this, e.target)} />
                        </div>
                        <div className='form-group'>
                            <TextField required variant='outlined' name='password' type='password' label='Password' value={password} onChange={e => updateLoginForm(this, e.target)} />
                        </div>
                        <Button  type='submit' variant='contained' sx={{backgroundColor: 'black', '&:hover': { backgroundColor: 'gray'}}} onClick={() => this.loginUser()}>Log in</Button>
                    </Box>
                    
                </div>
        );
        // {have_alert && <AlertMessage alert_type='error' alert_message={alert_message}/>}
    }
}

