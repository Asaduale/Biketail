import React from 'react';
import { Rating, Card, TextField, CardContent, CardActions, Typography, Button, IconButton } from '@mui/material';
import '../css/IndividualBikePages.css';
import { Link } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { getUserName } from '../../actions/user';
import { purchaseBike, addSaleStock } from '../../actions/purchase';
import { toggleBikeSave, getUserSavedBikes } from "../../actions/user";

export default class BikeImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lister_name: '',
            quantity: 1,
            new_stock: 1,
            saved_bikes: []
        }
        // this.toggleSavedBikes = this.toggleSavedBikes.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.handleStockChange = this.handleStockChange.bind(this);
        this.handleStockEdit = this.handleStockEdit.bind(this);
        this.toggleSavedBikes = this.toggleSavedBikes.bind(this);

    }
    handleQuantityChange(e) {
        const {value} = e.target;
        this.setState({quantity: value})
    }
    handleStockChange(e) {
        const {value} = e.target;
        this.setState({new_stock: value})
    }
    handleStockEdit() {
        const { new_stock } = this.state;
        const { bike, app } = this.props;
        this.props.history.push('/listings');
        addSaleStock(bike, new_stock, app);
    }
    handlePurchase() {
        const { quantity } = this.state;
        const { bike, app } = this.props;
        this.props.history.push('/purchase-history');
        purchaseBike(bike, quantity, app);
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
    componentDidMount() {
        const { for_page, appState } = this.props;
        const { currentUser } = appState;
        if (currentUser) {
            getUserSavedBikes(this, for_page);
        }
        console.log(this.props.bike);
        getUserName(this.props.bike.listed_by, this);
        
    }
    handleDelete(e) {
        const { bike, for_page, appState, setAppState } = this.props;
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
        const { quantity, new_stock} = this.state;
        const { lister_name, saved_bikes } = this.state;
        const { bike, for_page, appState } = this.props;
        const { currentUser, currentUserID } = appState;
        const condition_color_map = {
            'Brand New': 'condition-brand-new',
            'Like New': 'condition-like-new',
            'Very Good': 'condition-very-good',
            'Good': 'condition-good',
            'Acceptable': 'condition-acceptable'
        }
        console.log('&&&&&&')
        console.log(lister_name);
        return(
            <Card variant='outlined' className='bike-info-container'>
            <CardContent className='bike-info-container-content' >
                <div><Rating value={bike.avg_ratings} precision={0.5} readOnly /><span>{bike.ratings.length > 0 ? `by ${bike.ratings.length} users` : '(no ratings)'}</span></div>
                <Typography gutterBottom variant="h4" component="div" className='bike-prices'>
                    {`$${for_page === 'buyer' ? bike.price : `${bike.price_by_day} / day`}`}
                </Typography>
                <Typography gutterBottom variant="h6" className='bike-prices'>
                    listed by <Link to="">{lister_name}</Link>
                </Typography>
                <Typography gutterBottom variant="h6" className='bike-prices'>
                    <strong>{bike.stock}</strong> available in stock
                </Typography>
                <Typography gutterBottom variant="h5" >
                    Overview:
                </Typography>
                <Typography gutterBottom variant="subtitle1" className='bike-overview'>
                    condition: <span className={condition_color_map[bike.condition]}>{bike.condition}</span>
                </Typography>
                <Typography gutterBottom variant="subtitle1" className='bike-overview'>
                    type: {bike.type}
                </Typography>
                <Typography gutterBottom variant="subtitle1" className='bike-overview'>
                    brand: {bike.brand}
                </Typography>
                <Typography gutterBottom variant="subtitle1" className='bike-overview'>
                    model: {bike.model}
                </Typography>
                <Typography gutterBottom variant="subtitle1" className='bike-overview'>
                    frame_size: {bike.frame_size}
                </Typography>
                <Typography gutterBottom variant="subtitle1" className='bike-overview'>
                    wheel_size: {bike.wheel_size}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="small" onClick={this.toggleSavedBikes}>
                {currentUser && saved_bikes.includes(bike._id) &&
                <FavoriteIcon className='favorite-icon' />}
                {currentUser && !saved_bikes.includes(bike._id) &&
                <FavoriteBorderIcon/>}
                {!currentUser && <FavoriteBorderIcon/>}
            </IconButton>
            </CardActions>
            {currentUser && for_page === 'buyer' && currentUserID === bike.listed_by &&
            <CardActions><TextField
            fullWidth
            type='number'
            variant="filled"
            id="outlined-basic"
            required
            InputProps={{
                inputProps: {
                    min: 1
                }
            }}
            value={new_stock}
            label="Increase stock"
            onChange={this.handleStockChange}
            /><IconButton size="small" onClick={this.handleStockEdit}>
                <AddBusinessIcon/>
            </IconButton></CardActions>}
            {currentUser && for_page === 'buyer' && bike.listed_by !== currentUserID && bike.stock > 0  && <CardActions><TextField
                        fullWidth
                        type='number'
                        variant="filled"
                        id="outlined-basic"
                        required
                        InputProps={{
                            inputProps: { 
                                min: 1,
                                max: bike.stock,
                            }
                        }}
                        value={quantity}
                        label="Purchase quantity"
                        onChange={this.handleQuantityChange}
                    /><Button variant='contained' sx={{backgroundColor: '#0051c3', '&:hover': { backgroundColor: 'gray'}}} onClick={this.handlePurchase}>Purchase</Button></CardActions>}
            </Card>
        )
    }
}