var mongoose = require('mongoose');
// Setup schema
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var userSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    lastSeen: {
        type: String,
        required: false
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Users = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
    Users.find(callback).limit(limit);
}