const mongoose = require('mongoose');

// schemat dokumentu user
const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: true,
        minLength: 2,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
});

// model
module.exports = mongoose.model('User', userSchema);