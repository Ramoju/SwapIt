var mongoose = require('mongoose');
// Setup schema
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        auto: true,
    },
    roomId: {
        type: String,
        required: true
    },
    senderID: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    feedId: {
        type: String,
        required: true
    },
    feedTitle: {
        type: String,
        required: true
    },
    ownerID: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    messages: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            required: true,
            auto: true,
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            _id: String,
            avatar: String,
            name: String
        }

    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var Model = module.exports = mongoose.model('chats', schema);
module.exports.get = function (callback, limit) {
    Model.find(callback).limit(limit);
}