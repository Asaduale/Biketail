import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/Listings.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import SearchBar from './searchBar';
import { toggledRentalBikeState } from '../../actions/rent';
import { toggledSaleBikeState } from '../../actions/sale';
class AdminBikeListings extends React.Component {
    constructor(props) {
        super(props);
        const search = this.props.params.search ? this.props.params.search : '';
        console.log(search);
        this.props.history.push(search.length > 0 ? `/adminBikesList/${search}` : '/adminBikesList');
        this.toggledRental = this.toggledRental.bind(this);
        this.toggledSale = this.toggledSale.bind(this);
    }


    toggledRental(e, bike){
        const { app } = this.props;
        toggledRentalBikeState(bike, app);
    }

    toggledSale(e, bike) {
        const { app } = this.props;
        toggledSaleBikeState(bike, app);
    }

    render() {
        const search = this.props.params.search ? this.props.params.search : '';
        const {bikes_for_sale, bikes_for_rent} = this.props.appState;
        console.log('search')
        console.log(search.length)
        console.log('bikes for sale')
        console.log(bikes_for_sale)
        console.log('bikes for rent')
        console.log(bikes_for_rent)
        return (

            <div>
                <SearchBar {...this.props} for_page='adminBikesList' query={search}/>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Model</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Ban</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {bikes_for_sale.map((bike) => (
                            (search.length === 0 || (search.length > 0 && (bike.name.toLowerCase().includes(search.toLowerCase()) || bike.model.toLowerCase().includes(search.toLowerCase()) || bike.brand.toLowerCase().includes(search.toLowerCase()) || bike._id.toLowerCase().includes(search.toLowerCase())))) && (<TableRow key={`sale${bike._id}`}>

                            <TableCell align="center"> <img className='bikeAdminImages' src={bike.images[0]}/> </TableCell>
                            <TableCell align="center">{bike.name}</TableCell>
                            <TableCell align="center">{bike.model}</TableCell>
                            <TableCell align="center" sx={{color: '#2c387e'}}>Sale</TableCell>
                            <TableCell align="center"><Switch color="error" onChange={(e) => this.toggledSale(e, bike)} defaultChecked={bike.banned}/></TableCell>
                            </TableRow>)
                        ))}

                        {bikes_for_rent.map((bike) => (
                            (search.length === 0 || (search.length > 0 && (bike.name.toLowerCase().includes(search.toLowerCase()) || bike.model.toLowerCase().includes(search.toLowerCase()) || bike.brand.toLowerCase().includes(search.toLowerCase()) || bike._id.toLowerCase().includes(search.toLowerCase())))) && (<TableRow key={`rental${bike._id}`}>

                            <TableCell align="center">   <img className='bikeAdminImages' src={bike.images[0]}/>  </TableCell>
                            <TableCell align="center">{bike.name}</TableCell>
                            <TableCell align="center">{bike.model}</TableCell>
                            <TableCell align="center" sx={{color: '#00695f'}}>Rental</TableCell>
                            <TableCell align="center"><Switch color="error" onChange={(e) => this.toggledRental(e, bike)} defaultChecked={bike.banned}/></TableCell>
                        </TableRow>)
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            );



    }
}


export default (props) => (
    <AdminBikeListings {...props} params={useParams()}/>
);