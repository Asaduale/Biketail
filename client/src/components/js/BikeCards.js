import React from 'react';
import Cards from "./Cards";
import Grid from '@mui/material/Grid';
import '../css/BikeCard.css';
import { getUserSavedBikes } from '../../actions/user';

export default class BikeCards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { for_page, query } = this.props;
        const {bikes_for_rent, bikes_for_sale, currentUser, currentUserID, currentEntireUser} = this.props.appState;
        if (for_page === 'buyer_saved' && currentUser) {
            const saved_sale_bikes = bikes_for_sale.filter((bike) => bike.saved_by.includes(currentUserID) && !bike.banned);
            return (
                <div className='bike-card-container'>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {
                            saved_sale_bikes.map((bike) => (
                                <Grid item key={`sell_saved${bike._id}`}>
                                {!bike.banned &&
                                (<Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'buyer'}/>)}
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            );
        } else if (for_page === 'renter_saved' && currentUser) {
            const saved_rental_bikes = bikes_for_rent.filter((bike) => bike.saved_by.includes(currentUserID) && !bike.banned);
            return (
                <div className='bike-card-container'>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {
                            saved_rental_bikes.map((bike) => (
                                <Grid item key={`rent_saved${bike._id}`}>
                                {!bike.banned &&
                                (<Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'renter'}/>)}
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            );
        } else if (for_page === 'purchase-history' && currentUser) {
            const purchased_bikes = bikes_for_sale.filter((bike) => currentEntireUser.purchased_bikes.includes(bike._id));
            return (
                <div className='bike-card-container'>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {
                            purchased_bikes.map((bike) => (
                                !bike.banned && (query !== undefined && (bike.name.toLowerCase().includes(query.toLowerCase()) || bike.model.toLowerCase().includes(query.toLowerCase()) || bike.brand.toLowerCase().includes(query.toLowerCase()))) &&
                                <Grid item key={`purchase-history${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'buyer'}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            );
        } else {
            return (
                <div className='bike-card-container'>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        { for_page === 'renter' && bikes_for_rent.map((bike) => (
                            !bike.banned && (query !== undefined && (bike.name.toLowerCase().includes(query.toLowerCase()) || bike.model.toLowerCase().includes(query.toLowerCase()) || bike.brand.toLowerCase().includes(query.toLowerCase()))) && (<Grid item key={`rent${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'renter'}/>
                            </Grid>)
                        ))}
                        {for_page === 'buyer' && bikes_for_sale.map((bike) => (
                            !bike.banned && (query !== undefined && (bike.name.toLowerCase().includes(query.toLowerCase()) || bike.model.toLowerCase().includes(query.toLowerCase()) || bike.brand.toLowerCase().includes(query.toLowerCase()))) && (<Grid item key={`sell${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'buyer'}/>
                            </Grid>)
                        ))}
                        {/* {currentUser && for_page === 'buyer_saved' && bikes_for_sale.map((bike) => (
                            saved_sale_bikes.includes(bike._id) && !bike.banned && bike.status !== 'purchased' && (<Grid item key={`sell_saved${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'buyer'}/>
                            </Grid>)
                        ))}
                        {currentUser && for_page === 'renter_saved' && bikes_for_rent.map((bike) => (
                            saved_rental_bikes.includes(bike._id) && !bike.banned && (<Grid item key={`rent_saved${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'renter'}/>
                            </Grid>)
                        ))} */}
                        {currentUser && for_page === 'listings_sell' && bikes_for_sale.map((bike) => (
                            currentUserID === bike.listed_by && (<Grid item key={`sell_listings${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'buyer'}/>
                            </Grid>)
                        ))}
                        {currentUser && for_page === 'listings_rent' && bikes_for_rent.map((bike) => (
                            currentUserID === bike.listed_by && (<Grid item key={`rent_listings${bike._id}`}>
                                <Cards {...this.props} app={this.props.app}
                                       bike={bike} for_page={'renter'}/>
                            </Grid>)
                        ))}
                    </Grid>
                </div>
            );
        }
    }
}
