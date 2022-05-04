const mongoose = require('mongoose');
const { Schema } = mongoose;
const {UserSchema} = require("./user");

const BookingSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
        unique: false
    },
    bike: {
        type: mongoose.Schema.Types.ObjectId, ref: 'bikesForRent',
        required: true,
        unique: false
    },
}, { autoIndex: false })

BookingSchema.pre('save', function(next) {
    next(); 
});


BookingSchema.statics.getAll = function() {
    return this.find();
};

BookingSchema.statics.getByName = function() {
    return this.find();
};


const bookings = mongoose.model('bookings', BookingSchema)

module.exports = { bookings }

