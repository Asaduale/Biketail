"use strict";
// Rental bike ratings schema
const mongoose = require('mongoose');
const { Schema } = mongoose;


const RatingSchema = new Schema({
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
    rental_bike_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }   
},
{timestamps: true }
);


RatingSchema.statics.findByUserBike = function(user_id, rental_bike_id) {
	const Rating = this;
	return Rating.findOne({ user_id: user_id, rental_bike_id: rental_bike_id }).then((rating) => {
		return new Promise((resolve, reject) => {
            if (rating) {
                resolve(rating);
            } else {
                reject();
            }
        })
	});
}


const Rating = mongoose.model('Rating', RatingSchema)
module.exports = { Rating }
