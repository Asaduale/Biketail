"use strict";
// Rental bike ratings schema
const mongoose = require('mongoose');
const { Schema } = mongoose;


const SaleRatingSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    heading: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sale_bike_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }   
},
{timestamps: true }
);


SaleRatingSchema.statics.findByUserBike = function(user_id, sale_bike_id) {
	const Rating = this;
	return Rating.findOne({ user_id: user_id, sale_bike_id: sale_bike_id }).then((rating) => {
		return new Promise((resolve, reject) => {
            if (rating) {
                resolve(rating);
            } else {
                reject();
            }
        })
	});
}


const SaleRating = mongoose.model('SaleRating', SaleRatingSchema)
module.exports = { SaleRating }
