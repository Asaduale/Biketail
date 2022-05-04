const mongoose = require('mongoose');
const { Schema } = mongoose;

const PurchaseSchema = new Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    bike: {
        type: mongoose.Schema.Types.ObjectId, ref: 'bikesForSale',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    }
},
{timestamps: true }
);


PurchaseSchema.statics.getAll = function() {
    return this.find();
};

PurchaseSchema.statics.getByUser = function(user_id) {
    return this.find({buyer: user_id});
};


const Purchase = mongoose.model('Purchase', PurchaseSchema)

module.exports = { Purchase }

