import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/BikeCard.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import SearchBar from './searchBar';
import { getUsers, toggleUserRole } from '../../actions/admin';

class AdminUserListings extends React.Component {
    constructor(props) {
        super(props);
        const search = this.props.params.search ? this.props.params.search : '';
        console.log(search);
        this.props.history.push(search.length > 0 ? `/adminUsersList/${search}` : '/adminUsersList');
        this.state = {
            search: '',
            all_users: [] // all
        }
        this.toggled = this.toggled.bind(this);
    }

    componentDidMount() {
        getUsers(this);
    }
    toggled(e, cur_user){
        console.log(cur_user)
        
        toggleUserRole(cur_user);

    }

    render() {
        const search = this.props.params.search ? this.props.params.search : '';
        const {all_users} = this.state;
        console.log('*******************');
        console.log(this.state.all_users);
        return (
            <div>
                <SearchBar {...this.props} for_page='adminUsersList' query={search}/>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Ban</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {all_users.map((cur_user) => (
                        search.length === 0 || (search.length > 0 && (cur_user.name.toLowerCase().includes(search.toLowerCase()) || cur_user.email.toLowerCase().includes(search.toLowerCase()) || cur_user._id.toLowerCase().includes(search.toLowerCase())))) && (<TableRow key={cur_user._id}>
                            <TableCell align="center">{cur_user.name}</TableCell>
                            <TableCell align="center">{cur_user.email}</TableCell>
                            <TableCell align="center"><Switch color="error" onChange={(e) => this.toggled(e, cur_user)  } defaultChecked={cur_user.role == -1}/></TableCell>
                        </TableRow>)
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}


export default (props) => (
    <AdminUserListings {...props} params={useParams()}/>
);