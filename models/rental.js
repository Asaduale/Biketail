const mongoose = require('mongoose');
const { Schema } = mongoose;
const {UserSchema} = require("./user");
const {BookingSchema} = require("./booking");




const RentSchema = new Schema({
    status: {
        type: String,
        required: true
    },
    name: {
		type: String,
		required: true,
		minlength: 3,
		trim: true,
	},
    model: {
        type: String,
        required: true
    },
    banned: {
        type: Boolean,
        default: false 
    },
    condition: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    frame_size: {
        type: String,
        required: true
    },
    wheel_size: {
        type: Number,
        required: true
    },
    suspension: {
        type: String,
        required: true
    },
    brake_type: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price_by_day: {
        type: Number,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    listed_by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    saved_by: {
        type: Array,
        default: []
    },
    information: {
        type: String,
        required: true
    },
    ratings: {
        type: Array,
        default: []
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    avg_ratings: {
        type: Number,
        required: true
    },
    pickup_details: {
        type: String,
        required: true
    },
    bookings: {
        type: Array
        }
}, { autoIndex: false });

RentSchema.pre('save', function(next) {
    next(); 
});


RentSchema.statics.getAll = function() {
    return this.find();
};

RentSchema.statics.getByName = function() {
    return this.find();
};

const bikesForRent = mongoose.model('bikesForRent', RentSchema)

module.exports = { bikesForRent }

