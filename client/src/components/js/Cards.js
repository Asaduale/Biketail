import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Rating, Card, CardActions, CardContent, CardMedia, Button, IconButton, Typography, Modal} from '@mui/material';
import { toggleBikeSave, getUserSavedBikes } from "../../actions/user";
import '../css/BikeCard.css';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSavedBikes = this.toggleSavedBikes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // var bikes_for_sale = this.props.appState.bikes_for_sale
    this.state = { curr_bikes_for_sale: [], saved_bikes: [] }
  }


  componentDidMount() {
    const { for_page, appState } = this.props;
    const { currentUser } = appState;
    if (currentUser) {
      getUserSavedBikes(this, for_page);
    }
  }

  toggleSavedBikes(e) {
    const { bike, for_page, appState } = this.props;
    const { currentUser } = appState;
    if (currentUser) {
      toggleBikeSave(bike, for_page, this);
    } else {
      console.log("You must be logged in in order to save an item.");
    }
  }

  handleDelete(e) {
    const { bike, for_page, appState, setAppState, currentUser } = this.props;
    const {bikes_for_sale, bikes_for_rent} = appState;
    console.log(bike);
    const bikes_copy = Object.assign([], for_page === 'buyer' ? bikes_for_sale : bikes_for_rent);
    console.log(bikes_copy);
    bikes_copy.splice(bikes_copy.indexOf(bike), 1);
    
    if (for_page === 'buyer') {
      setAppState({bikes_for_sale: bikes_copy});
    } else if (for_page === 'renter') {
      setAppState({bikes_for_rent: bikes_copy});
    }
  }
  handleEdit(e) {
    return;
  }
  render() {
    const { bike, for_page, appState } = this.props;
    const { currentUser, currentUserID } = appState;
    const { saved_bikes } = this.state;
    const summary = `condition: ${bike.condition}, brand: ${bike.brand}\nframe size: ${bike.frame_size}, wheel size: ${bike.wheel_size}`;

    console.log("bike is " + JSON.stringify(bike))
    return (

      <Card sx={{ maxWidth: 345 }} className='bike-card-link'>
        <Link to={`${ for_page === 'buyer' ? 'buy_bike' : 'rent_bike'}/${bike._id}`}>
        <CardMedia
          component="img"
          height="150"
          image={bike.images[0]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bike.name}
          </Typography>
          <Typography gutterBottom component="div"><Rating value={bike.avg_ratings} precision={0.5} readOnly /><span>{bike.ratings.length > 0 ? `by ${bike.ratings.length} users` : '(no ratings)'}</span></Typography>
          <Typography gutterBottom variant="h6" component="div" className='bike-prices'>
            {`$${for_page === 'buyer' ? bike.price : `${bike.price_by_day} / day`}`}
          </Typography>
          {for_page === 'buyer' && <Typography variant="body2" sx={{color: `${bike.stock > 0 ? '#357a38' : '#aa2e25'}`}}>
            {bike.stock > 0 ? 'Available in stock' : 'Currently sold out'}
          </Typography>}
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
        </Link>
        <CardActions>
          <IconButton size="small" onClick={this.toggleSavedBikes}>
            {currentUser && saved_bikes.includes(bike._id) &&
              <FavoriteIcon className='favorite-icon' />}
            {currentUser && !saved_bikes.includes(bike._id) &&
              <FavoriteBorderIcon/>}
            {!currentUser && <FavoriteBorderIcon/>}
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

