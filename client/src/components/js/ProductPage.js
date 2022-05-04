import React, { Component } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, IconButton, Typography,
} from "@mui/material";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { bikes_for_sale, bikes_for_rent, user, currentUser } =
      this.props.appState;

      console.log(this.props)
    return (
      <div>
        <div className="image-div">
          <img src={bikes_for_rent[0].images}></img>
        </div>

        <div className="info-div">
          <Typography variant='h6'>{bikes_for_rent[0].name} - ${bikes_for_rent[0].price_by_day} per day </Typography>
          <Typography paragraph> {bikes_for_rent[0].information}</Typography>
          <Typography paragraph> Model: {bikes_for_rent[0].model}</Typography>
          <Typography paragraph> Condition: {bikes_for_rent[0].condition}</Typography>
          <Typography paragraph> Color: {bikes_for_rent[0].color}</Typography>
          <Typography paragraph> Type: {bikes_for_rent[0].type}</Typography>
          <Typography paragraph> Material: {bikes_for_rent[0].material}</Typography>
        </div>
        {/* https://react-google-maps-api-docs.netlify.app/ */}
        <LoadScript
        googleMapsApiKey="AIzaSyC0IQO_2LvBxkDYn7IRMCiwplPiIzz9EBI"
      >
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
          <></>
        </GoogleMap>
      </LoadScript>


      </div>
    );
  }
}

export default ProductPage;
