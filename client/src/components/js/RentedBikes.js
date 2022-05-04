import React from 'react';
import '../css/BikeCard.css';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { uid } from 'react-uid';
import SearchBar from './searchBar';
import { Typography } from '@mui/material';

class RentedBikes extends React.Component {
    constructor(props) {
        super(props);
        const search = this.props.params.search ? this.props.params.search : '';
        console.log(search);
        this.props.history.push(search.length > 0 ? `/rentedBikes/${search}` : '/rentedBikes');
        // const { for_page } = this.props;
        // const {bikes_for_sale, bikes_for_rent, curr_user, all_users, currentUser} = this.props.appState;
        this.returnClicked = this.returnClicked.bind(this);
    }

    returnClicked(e, bikeId){

        const {bikes_for_rent, user} = this.props.appState;
        // needs to change to use the row uid and bike Ids but I feel that can be done later on.
        user.curent_rentals = user.curent_rentals.filter(s => {return s.id !== bikeId; });
        this.setState({[user]: user});
        this.render();
    }

    render() {

        const {user} = this.props.appState;
        const search = this.props.params.search ? this.props.params.search : '';
        return (

            <div>
                <SearchBar {...this.props} for_page='rentedBikes' query={search}/>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Model</TableCell>
                                <TableCell align="center">Due Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        {user.curent_rentals.map((bike) => (
                            <TableRow key={bike.name}>

                            <TableCell align="center"> <img className='bikeAdminImages' src={bike.images[0]}/> </TableCell>
                            <TableCell align="center">{bike.name}</TableCell>
                            <TableCell align="center">{bike.model}</TableCell>
                            <TableCell align="center">March 30th, 2022</TableCell>
                            <TableCell align="center">     <Typography variant="p" component="string" sx={{color: "Green"}}>Within Due Date</Typography>   </TableCell>
                            <TableCell align="center">  <Button variant="contained" color="inherit"  onClick={(e) => this.returnClicked(e, bike.id)}>Return</Button> </TableCell>
                        </TableRow>
                        ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            );



    }
}

export default (props) => (
    <RentedBikes {...props} params={useParams()}/>
);
