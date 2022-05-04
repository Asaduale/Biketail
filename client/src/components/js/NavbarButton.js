import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from './LogoutButton';
import AdminBikeListings from './AdminBikeListings';
import AdminUserListings from './AdminUserListings';


export default class NavbarButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
        this.toggleAccountMenu = this.toggleAccountMenu.bind(this);

    }
    toggleAccountMenu(e) {
        const { anchorEl } = this.state;
        this.setState({anchorEl: Boolean(anchorEl) ? null : e.currentTarget});
    }


    render() {
        const { page, history, currentUserRole, app } = this.props;
        const { anchorEl } = this.state;
        if (page === 'account' && currentUserRole == 1) {
            return (
                <div>
                <Button variant="outlined" color="inherit" sx={{ color: 'white', m:1.5}}>
                <Link to={ `/portal`} style={{color: 'white', textDecoration: 'none'}}>Renter Portal</Link>
                </Button>
                
                <Button variant="outlined" color="inherit" sx={{ color: 'white', m:1.5}}>
                <Link to={ `/purchase-history`} style={{color: 'white', textDecoration: 'none'}}>Purchase History</Link>
                </Button>


                <IconButton
                    size="small"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.toggleAccountMenu}
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      keepMounted
                      anchorEl={anchorEl}
                      transformOrigin={{vertical: 'top', horizontal: 'right' }}
                      open={Boolean(anchorEl)}
                      onClose={this.toggleAccountMenu}
                >
                    <MenuItem onClick={this.toggleAccountMenu}><Button sx={{ color: 'white', display: 'block' }}><Link to={ `/account`} style={{ color: 'black', textDecoration: 'none'}}>Account</Link></Button></MenuItem>
                    <MenuItem onClick={this.toggleAccountMenu}><Button sx={{ color: 'white', display: 'block' }}><Link to={ `/listings`} style={{ color: 'black', textDecoration: 'none'}}>My Listings</Link></Button></MenuItem>
                    <MenuItem onClick={this.toggleAccountMenu}><LogoutButton {...this.props} history={history} app={app}/></MenuItem>       
                    <MenuItem onClick={this.toggleAccountMenu}  sx={{ disabled: true}}>  <Button sx={{ color: 'white', display: 'block' }}><Link to={ `/adminUsersList`} style={{ color: 'black', textDecoration: 'none'}}>Site Users</Link></Button> </MenuItem>
                    <MenuItem onClick={this.toggleAccountMenu}  sx={{ disabled: true}}>  <Button sx={{ color: 'white', display: 'block' }}><Link to={ `/adminBikesList`} style={{ color: 'black', textDecoration: 'none'}}>Site Bikes</Link></Button> </MenuItem>
                </Menu>
                </div>
            );
        } else if (page === 'account' && currentUserRole != 1) {
            return (
                <div>
                <Button variant="outlined" color="inherit" sx={{ color: 'white', m:1.5}}>
                <Link to={ `/portal`} style={{color: 'white', textDecoration: 'none'}}>Renter Portal</Link></Button>
               
                
                <Button variant="outlined" color="inherit" sx={{ color: 'white', m:1.5}}>
                <Link to={ `/purchase-history`} style={{color: 'white', textDecoration: 'none'}}>Purchase History</Link></Button>

                <IconButton
                    size="small"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.toggleAccountMenu}
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      keepMounted
                      anchorEl={anchorEl}
                      transformOrigin={{vertical: 'top', horizontal: 'right' }}
                      open={Boolean(anchorEl)}
                      onClose={this.toggleAccountMenu}
                >
                    <MenuItem onClick={this.toggleAccountMenu}><Button sx={{ color: 'white', display: 'block' }}><Link to={ `/account`} style={{ color: 'black', textDecoration: 'none'}}>Account</Link></Button></MenuItem>
                    <MenuItem onClick={this.toggleAccountMenu}><Button sx={{ color: 'white', display: 'block' }}><Link to={ `/listings`} style={{ color: 'black', textDecoration: 'none'}}>My Listings</Link></Button></MenuItem>
                    <MenuItem onClick={this.toggleAccountMenu}><LogoutButton {...this.props} history={history} app={app}/></MenuItem>
                </Menu>
                </div>
            );
        }
        
        else if (page === 'post-listing') {
            return (
                <Button
                        sx={{ color: 'white', display: 'block' }}>
                    <Link to={ `/${page}`} style={{color: 'white', textDecoration: 'none'}}>Post A Listing</Link>
                </Button>
            );
        }
        else if (page === 'saved') {
            return (
                <Tooltip title='My saved bikes'>
                <IconButton
                    size="small"
                    color="inherit"
                >
                    <Link to={ '/saved'} style={{color: 'white', textDecoration: 'none'}}><FavoriteIcon /></Link>
                </IconButton>
                </Tooltip>
            )
        } else {
            return (
                <Button
                        sx={{ color: 'white', display: 'block' }}>
                    <Link to={ `/${page}`} style={{color: 'white', textDecoration: 'none'}}>{page}</Link>
                </Button>
            );
        }
    }
}