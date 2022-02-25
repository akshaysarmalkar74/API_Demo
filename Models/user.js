const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    }
});

module.exports = mongoose.model('User', UserSchema);