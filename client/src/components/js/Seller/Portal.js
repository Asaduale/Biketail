import React from 'react'
import '../../css/Seller/portal.css'
import BikeCards from '../BikeCards';
import Cards from '../Cards';
import { Grid, Button } from '@mui/material';
import PortalItem from './PortalItem';
import {getBookingsforUser} from "../../../actions/booking";


export default function Portal(props) {

    const { bikes_for_rent, currentUserID } = props.appState;
    // const [bookingsForUser, updateBookings] = React.useState([]);
    // const [bikesUsed, updateBikes] = React.useState([]);

    
    // React.useEffect(function effectFunction() {
    //     getBookingsforUser(currentUserID, this).then((books) => {
    //         return books.bookings
    //     })
    //     .then((res) => {
            
    //         console.log("books for user are " + JSON.stringify(res))
    //         updateBookings(res)
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });


    // }, []);


    return (
        <div className='portal'>
            <h2>Renter Portal</h2>
            <div className='bike-options'>
            {bikes_for_rent.map((bike) => 
    
            <PortalItem bike={bike}/>
            )}
            </div>
            
        </div>
    )
    
}












// class Portal extends React.Component {

// // export default function Portal(props) {
//     constructor(props) {
//         super(props);
//         const { id } = this.props.params;
        
//         this.state = {
//             bookingStartEndDates: [],
//             curr_bike: null,
//             bookingsForUser = [],
//             bikesUsed = []
//         }
        
//         const { bikes_for_rent, currentUserID } = props.appState;
//     }
    

    
    
//         function getBookingsforUser(currentUserID, this).then((books) => {
//             return books.bookings
//         })
//         .then((res) => {
            
//             console.log("books for user are " + JSON.stringify(res))
//             updateBookings(res)
//         })
//         .catch(error => {
//             console.log(error);
//         });


        


//     }, []);


    

//     return (
//         <div className='portal'>
//             <h2>Renter Portal</h2>
//             <div className='bike-options'>
//             {bookingsForUser.map((bike) => 
//             // <Grid item xs={2}>
//             //     <Cards {...props}
//             //             bike={bike} for_page={'renter'}/>
//             // </Grid>
    
//             // <Button variant="contained">{bike.name}</Button>
    
//             <PortalItem bike={bike}/>
//             )}
//             </div>
            
//         </div>
//     )
    
// }


