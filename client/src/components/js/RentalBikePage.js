import React from "react";
import '../css/Ratings.css';
import { Button, IconButton, Grid, Typography, Paper, List, ListItem, ListItemText, Rating } from "@mui/material";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useParams, Link } from 'react-router-dom';
import Calender from "./Calender";
import BikeImageList from './BikeImageList';
import BikeInfoBox from './BikeInfoBox';
import BikeAdditionalInfo from './BikeAdditionalInfo';
import '../css/IndividualBikePages.css';
import RatingForm from "./RatingForm";
// import RatingStars from "../RatingStars";
import {postBooking, getBookingsforBike} from "../../actions/booking";
import {addBookingForBike} from "../../actions/rent";
import { getRentalBikeRatings } from '../../actions/rating';




class RentalBikePage extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.params;
        this.props.history.push(`/rent_bike/${id}`);
        this.state = {
            startDay: null,
            endDay: null,
            bookingStartEndDates: [],
            curr_bike: null,
            bikeRatings: []
        }
        // const {bike} = this.props;
        // console.log("curr bike is " + bike )
    }

    componentDidMount() {
        const { id } = this.props.params;
        getRentalBikeRatings(id, this);
    }

    rentBike(current_bike){
        console.log("current_bike is " + JSON.stringify(current_bike) )

        console.log("rentBike Called  state startday is " + this.state.startDay + " state end day is " +  this.state.endDay)
        const newBooking = {
            startDate:  this.state.startDay,
            endDate: this.state.endDay,
            bookedBy: this.props.appState.currentUserID,
            bike: current_bike._id
          }
        console.log("new booking is " + JSON.stringify(newBooking))
        console.log("current user ID is  " + this.props.appState.currentUserID)
        postBooking(newBooking, this).then(res => {
            if (res.status === 200) {
                console.log("200 response")
                console.log("res is " + JSON.stringify(res))
                return res.json();
                
            }
        })
        .then(result => {
            console.log("result of post booking is " + JSON.stringify(result))
            // var bikeResult = addBookingForBike(this.props.appState.currentUserID, current_bike._id, newBooking, this)
            var bikeBookings  = getBookingsforBike(current_bike._id, this)
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleCalendarDateChange(startDate, endDate){
        console.log("Startday is " + this.state)
        console.log("Startday is " + this.state.startDay)
        console.log("Endday is " + this.state.endDay)
        console.log("Endday is ")

        this.state.startDay = (startDate == null) ? this.state.startDay : startDate
        this.state.endDay = (endDate == null) ? this.state.endDay : endDate
        
    }

    setBookingStartEndDates(){
        
        var bikeBookings = null 
        getBookingsforBike(this.state.curr_bike._id, this)
        .then(res => {
        bikeBookings = res
        console.log("bikeBookings are " + JSON.stringify(bikeBookings.bookings))
        for(var count = 0; count < bikeBookings.bookings.length; count++){
            console.log(bikeBookings.bookings[count])
            this.state.bookingStartEndDates.push((bikeBookings.bookings[count].startDate, bikeBookings.bookings[count].endDate ))
    
        }
        console.log("bookingStartEndDates is " + this.state.bookingStartEndDates)
    
        })
        .catch(error => {
        console.log(error);
        });

        
    }


    render() {
        const { id } = this.props.params;
        const { bikeRatings } = this.state;
        const { app } = this.props;
        const { bikes_for_rent, currentUser } = this.props.appState;
        const current_bike = (function() {
            for (let i = 0; i < bikes_for_rent.length; i++) {
                if (bikes_for_rent[i]._id == id) {
                    return bikes_for_rent[i];
                }
            }
        })();
        this.state.curr_bike =  current_bike;
        // this.setState({curr_bike: current_bike})
        console.log('***')
        console.log(current_bike);

        if (current_bike){

        return (
            <Grid container className='individual-bike-page'>
                <Grid container className='individual-bike-page-grid-row' alignItems='center' justifyContent='center' direction='column'><Grid item ><Typography variant="h2">{current_bike.name}</Typography></Grid></Grid>
                <Grid container className='individual-bike-page-grid-row'>
                    <Grid item xs={9}><BikeImageList {...this.props} image_list={current_bike.images}  bike={current_bike}/></Grid>
                    <Grid item xs={3}><BikeInfoBox {...this.props} bike={current_bike} for_page='renter'/></Grid>
                </Grid>
                <Grid container className='individual-bike-page-grid-row'>
                    <Grid item xs={9}><BikeAdditionalInfo {...this.props} bike={current_bike}/></Grid>
                    <Grid item xs={3}><Calender {...this.props} current_bike={current_bike} handleCalendarDateChange={this.handleCalendarDateChange.bind(this)}  setBookingStartEndDates={this.setBookingStartEndDates.bind(this)} bookingStartEndDates={this.state.bookingStartEndDates} ></Calender></Grid>
                    <Grid item xs={2}><Button sx={{ color: 'black', display: 'block' }} onClick={() => this.rentBike(current_bike)} >  <Link to='/portal' ><Typography>Rent</Typography>  </Link> </Button> </Grid>
                </Grid>
                <Grid container className='individual-bike-page-grid-row'>
                <Grid item xs={9}>
                    <Paper style={{maxHeight: 800, overflow: 'auto'}}>
                    <List>
                        {
                            bikeRatings.map(
                                (bikeRating) => (
                                    <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={bikeRating.heading}
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {bikeRating.name}
                                            </Typography>
                                            {bikeRating.comment}
                                            </React.Fragment>
                                        }
                                    />
                                    <Rating value={bikeRating.rating} precision={0.5} readOnly />
                                    </ListItem>
                                )
                            )
                        }
                    </List>
                    </Paper>
                </Grid>
                <Grid item xs={3}>{currentUser && <RatingForm bike_type='rental' bike={this} {...this.props} id={this.props.params.id} app={app}/>} </Grid>
                </Grid>
                {/* <div>
                <div class="content text-center">
                    <div class="large-rating"> <span>4.1</span><span>/5</span>
                    <div class="rating-text"> <span>11 ratings & 5 reviews</span> </div>
                </div>
                </div>
                </div> */}
                <Grid container className='individual-bike-page-grid-row'>
                <LoadScript googleMapsApiKey="AIzaSyC0IQO_2LvBxkDYn7IRMCiwplPiIzz9EBI">
                <GoogleMap
                    mapContainerStyle={{
                    width: '2000px',
                    height: '600px'
                    }}
                    center={{
                    lat: 43.651070,
                    lng: 	-79.347015
                    }}
                    zoom={10}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                </GoogleMap>
                </LoadScript>
                </Grid>
                {/* <Grid container className='individual-bike-page-grid-row'>
                    <RatingForm bike={this} {...this.props} id={this.props.params.id} />
                </Grid> */}
            </Grid>
        );
        }
        else{
            
            return <div />
        }
    }

}


export default (props) => (
    <RentalBikePage {...props} params={useParams()}/>
);