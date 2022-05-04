const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs'); 


const SaleSchema = new Schema({
    name: {
		type: String,
		required: true,
		minlength: 3,
		trim: true,
		// unique: true,
		// validate: {
		// 	validator: validator.isEmail,   // custom validator
		// 	message: 'Not valid email'
		// }
	}, 
    stock: {
        type: Number,
        default: 1
    },
	model: {
		type: String,
		required: true,
		minlength: 4
	},
    banned: {
        type: Boolean,
        defeault: false,
    },
    condition: {
        type: String,
        required: true,
        minLength: 4
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
        required: true,
        default: ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fphoto_53424477_grid-transparency-effect-seamless-pattern-with-transparent-mesh-light-grey-design-pattern-the-effect.html&psig=AOvVaw3q46efptPabf9pKHDo366J&ust=1648921634718000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNi8lfW18_YCFQAAAAAdAAAAABAD"]
    },
    selling_method: {
        type: [String],
        required: true
    },
    transaction_details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    listed_by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    ratings: {
        type: Array,
        default: []
    },
    avg_ratings: {
        type: Number,
        required: true
    },
    saved_by: {
        type: Array,
        default: []
    },
    information: {
        type: String
    }
});

SaleSchema.pre('save', function(next) {
    next(); 
});


SaleSchema.statics.getAll = function() {
    return this.find();
};

SaleSchema.statics.getByName = function() {
    return this.find();
};

const bikesForSale = mongoose.model('bikesForSale', SaleSchema)
module.exports = { bikesForSale }

