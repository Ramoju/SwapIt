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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    exchangeFor: {
        type: String,
        required: true
    },
    category: {
        icon: String,
        backgroundColor: String,
        label: String,
        value: Number
    },
    images: [{
        data: {
            type: String,
            required: true
        },
        contentType: String
    }],
    isSold: {
        type: Boolean,
        default: "false"
    },
    createdBy: {
        uId: String,
        name: String,
        email: String
    },
    wishlist: [{
        uid: String,
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var Model = module.exports = mongoose.model('feeds', schema);
module.exports.get = function (callback, limit) {
    Model.find(callback).limit(limit);
}