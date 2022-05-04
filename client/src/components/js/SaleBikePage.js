import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, List, ListItem, ListItemText, Rating } from '@mui/material';
import '../css/IndividualBikePages.css';
import BikeImageList from './BikeImageList';
import BikeInfoBox from './BikeInfoBox';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import BikeAdditionalInfo from './BikeAdditionalInfo';
import { getAllListings} from "../../actions/sale";
import RatingForm from "./RatingForm";
import { checkUserSaleRating, getSaleBikeRatings } from '../../actions/rating';

class SaleBikePage extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.params;
        this.props.history.push(`/buy_bike/${id}`);
        this.state = { curr_bikes_for_sale: [], canRate: null, bikeRatings: [] }

    }
    componentDidMount() {
        const {currentUserID} = this.props.appState;
        const { id } = this.props.params;
        if (currentUserID) {
            checkUserSaleRating(currentUserID, id);
        }
        getSaleBikeRatings(id, this);
    }

    render() {
        const { id } = this.props.params;
        const { app } = this.props;
        const { bikes_for_sale, currentUser, currentEntireUser, currentUserID } = this.props.appState;
        const { bikeRatings } = this.state;
        console.log("ID is " + id);
        const current_bike = (function() {
            for (let i = 0; i < bikes_for_sale.length; i++) {
                if (bikes_for_sale[i]._id == id) {
                    return bikes_for_sale[i];
                }
            }
        })();
        const { canRate } = this.state;
        console.log("current bike is " + JSON.stringify(current_bike))
        if (current_bike){
        return (
            <Grid container className='individual-bike-page'>
                <Grid container className='individual-bike-page-grid-row' alignItems='center' justifyContent='center' direction='column'><Grid item ><Typography variant="h2">{current_bike.name}</Typography></Grid></Grid>
                <Grid container className='individual-bike-page-grid-row'>
                    <Grid item xs={9}><BikeImageList {...this.props} image_list={current_bike.images} bike={current_bike}/></Grid>
                    <Grid item xs={3}><BikeInfoBox {...this.props} bike={current_bike} for_page='buyer' app={app}/></Grid>
                </Grid>
                <Grid container className='individual-bike-page-grid-row'>
                    <BikeAdditionalInfo {...this.props} bike={current_bike}/>
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
                <Grid item xs={3}>{currentUser && currentEntireUser.purchased_bikes.includes(id) && (canRate === null || canRate === true) && <RatingForm bike={this} {...this.props} id={this.props.params.id} app={app} bike_type='sale'/>}</Grid>
                </Grid>
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
                </GoogleMap>
                </LoadScript>
                </Grid>
            </Grid>
        )
        }
        else{
            return <div />
        }
    }
}

export default (props) => (
    <SaleBikePage {...props} params={useParams()}/>
);


