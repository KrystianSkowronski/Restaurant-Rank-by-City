const mongoose = require('mongoose');

// schemat dokumentu Restaurant
const restaurantSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    city: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    restaurantImage: {
        type: String,
    },
});

// model
module.exports = mongoose.model('Restaurant', restaurantSchema);