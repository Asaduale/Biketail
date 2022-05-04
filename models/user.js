"use strict";

const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

/**
 * User role values:
 *      -1 for banned
 *      0 for regular users
 *      1 for admins
 * Note: might make a roles model later instead
 */
const UserSchema = new Schema({
    email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		// validate: {
		// 	validator: validator.isEmail,   // custom validator
		// 	message: 'Not valid email'
		// }
	}, 
	password: {
		type: String,
		required: true,
		minlength: 4
	},
    role: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    saved_rental_bikes: {
        type: Array,
        default: []
    },
    saved_sale_bikes: {
        type: Array,
        default: []
    },
    current_rentals: {
        type: Array,
        default: []
    },
    purchased_bikes: { // references the bikesForSale model
        type: Array,
        default: []
    },
	purchase_history: { // references the purchase model
        type: Array,
        default: []
    }
});

UserSchema.pre('save', function(next) {
    const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
});

UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this;
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			console.log('no email')
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			console.log('have email')
			bcrypt.compare(password, user.password, (err, result) => {
				console.log(password)
				console.log(user.password)
				if (result) {
					console.log('have password')
					resolve(user);
				} else {
					console.log('don\'t have password')
					reject();
				}
			});
		});
	});
}

UserSchema.statics.findByEmail = function(email) {
	const User = this;
	return User.findOne({ email: email }).then((user) => {
		if (user) {
			return Promise.reject();
		}
		return Promise.resolve();
	});
}

const User = mongoose.model('User', UserSchema)
module.exports = { User, UserSchema }