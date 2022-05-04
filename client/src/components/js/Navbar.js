import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import '../css/Navbar.css';
import NavbarList from './NavbarList';
// const util = require('util')


export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { currentUser, app, currentUserRole } = this.props.appState;
        const general_pages = ['buy', 'rent', 'post-listing'];
        const user_pages = currentUser ? ['account', 'saved'] : ['login', 'signup'];
        return (
            <AppBar position='static' >
                <Container maxWidth='false' className={currentUserRole === 1 ? 'navbarContainerAdmin' : 'navbarContainer'}>
                    <Toolbar>
                            <Button sx={{ color: 'white', display: 'block' }}>
                                <Typography><Link to='/' style={{color: 'white', textDecoration: 'none'}}>Biketail</Link></Typography>
                            </Button>
                        <NavbarList app={app} {...this.props} pages={ general_pages } currentUserRole={currentUserRole} flexGrow={1} />
                        <NavbarList app={app} {...this.props}  pages={ user_pages } currentUserRole={currentUserRole} flexGrow={0} />
                        
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }

}