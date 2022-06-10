const mongoose = require('mongoose');
   
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    location: String,
    avatar_url: String,
    provider: String,
    created_at: Date,
    updated_at: Date
});

let User;

module.exports = {
    getUser: function() {
        if (!User) { User = mongoose.model('User', userSchema); }
        return User;
    }
}