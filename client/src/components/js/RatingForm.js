import React from 'react';
import '../css/main.css';
import { Box, TextField, Button, Typography, Rating } from '@mui/material';
import { postRating } from '../../actions/rating';


export default class RatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            heading: '',
            comment: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    addRating() {
        const { id, app, bike_type } = this.props;
        const { rating, heading, comment } = this.state;
        this.props.history.push(`/${bike_type === 'sale' ? 'buy_bike' : 'rent_bike'}/${id}`);
        postRating(rating, heading, comment, id, bike_type, app);
    }
    handleInputChange(e) {
        const {name, value} = e.target;
        if (name == 'rating') {
            this.setState({[name]: parseInt(value)});
            console.log('***********');
            console.log(value);
            console.log('*****typeof******');
            console.log(typeof this.state.rating);
        } else {
            this.setState({[name]: value});
        }
        
    }
    render() {
        const {rating, comment, heading} = this.state;
        console.log(rating)
        return(
        <Box component='form' onSubmit={() => this.addRating()}>
            <Typography variant='h6'>Add a rating: </Typography>
            <Box sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }}}>
            <Rating
                required
                name="rating"
                value={rating}
                onChange={this.handleInputChange}
            />
            </Box>
            <Box sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }}}>
            <div className='form-group'>
                <TextField required placeholder='Add a heading...' variant='outlined' name='heading' type='text' label='Heading' value={heading} onChange={this.handleInputChange} />
            </div>
            </Box>
            <Box sx={{ '.MuiTextField-root': { m: 1, width: '25ch' }}}>
            <div className='form-group'>
                <TextField required multiline placeholder='Add a rating text...' minRows={3} maxRows={6} variant='outlined' name='comment' type='text' label='Comment' value={comment} onChange={this.handleInputChange} />
            </div>
            </Box>
            <Button type='submit' variant='outlined' onClick={() => this.addRating()}>Post</Button>
        </Box>
        )
    }
}