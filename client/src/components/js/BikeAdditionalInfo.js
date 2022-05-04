import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import '../css/IndividualBikePages.css';

export default class BikeAdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { bike } = this.props;
        return(
            <Grid container className='bike-features-container'>
                    <Grid container>
                    <Grid item xs={6} className='bike-description-paragraph'><Typography variant="h4">Description</Typography>
                    <Typography gutterBottom variant='subtitle1' >{bike.information}</Typography>

                    <Typography variant="h4">Addition Pickup Info</Typography>
                    <Typography gutterBottom variant='subtitle1' >{bike.pickup_details}</Typography>
                    </Grid>
                    <Grid item xs={3}><Typography variant="h4">Bike Features</Typography>
                    <Typography gutterBottom variant='subtitle1'>Name: {bike.name}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Model: {bike.model}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Condition {bike.condition}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Color: {bike.color}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Type: {bike.type}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Material: {bike.material}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Frame size: {bike.frame_size}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Wheel size: {bike.wheel_size}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Suspension type: {bike.suspension}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Brake type: {bike.brake_type}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Age: {bike.age}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Brand: {bike.brand}</Typography>
                    </Grid>
                    <Grid item xs={3}><Typography variant="h4">Fulfillment Method</Typography>
                    <Typography gutterBottom variant='subtitle1'>Selling method: {bike.selling_method}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Transaction method: {bike.transaction_details}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Location {bike.location}</Typography>
                    <Typography gutterBottom variant='subtitle1'>Color: {bike.color}</Typography>
                    </Grid>
                    </Grid>
            </Grid>
        )
    }
}