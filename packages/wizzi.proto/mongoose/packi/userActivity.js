const mongoose = require('mongoose');
   
const userActivitySchema = new mongoose.Schema({
    username: { type: String, unique: true },
    openPackies: { type: Array},
    openFiles: { type: Array},
});

let UserActivity = null;

module.exports = {
    getUserActivity: function() {
        if (!UserActivity) { UserActivity = mongoose.model('UserActivity', userActivitySchema); }
        return UserActivity;
    }
}