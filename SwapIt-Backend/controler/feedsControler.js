// Import  model
Feeds = require('../model/feedModel')
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, "SomeImage" + "." + file.originalname.split(".").pop());
    },
});

const upload = multer({ storage: storage });
// Handle index actions
exports.index = function (req, res) {
    Feeds.get(function (err, feedList) {
        if (err) {
            res.json({
                status: "error",
                success: false,
                message: err,
            });
            console.log("feed-result-error", err.message)
        } else {

            var data = []
            feedList.forEach(element => {

                //element.images.data = Buffer.from(feedList[0].images.data).toString('base64')
               if(!element.isSold)
                data.push(element)
            });
            console.log("feed-result", data)
            res.json({
                status: "success",
                success: true,
                message: "Feed retrieved successfully",
                data: data
            });

        }
    });
};

// Handle create actions
exports.addNewFeed = function (req, res) {
    console.log(req.body)
    var newFeed = new Feeds();
   /*  var img = {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/jpeg'
    } */
    newFeed.title = req.body.title;
    newFeed.description = req.body.description;
    newFeed.exchangeFor = req.body.exchange;
    newFeed.images = req.body.images;
    newFeed.category = {
        backgroundColor: req.body.backgroundColor,
        icon: req.body.icon,
        label: req.body.label,
        value: req.body.value,
    };
    newFeed.createdBy = {
        uId: req.body.createdBy,
        name: req.body.name,
        email: req.body.email
    };

    // save the feed and check for errors
    newFeed.save(function (err) {
        if (err) {
            res.json({
                status: 'failed',
                success: false,
                message: 'New feed failed!' + err.message,
                err: err
            });
            console.log(err.message)
        }
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'New feed created!',
                data: newFeed
            });
    });
};


// Handle  actions
exports.markFeedAsSold = function (req, res) {
    Feeds.findOne({ id: req.params.id }, function (err, feed) {
        console.log('feed:', feed);
        console.log('feedID:', req.params.id);
        if (err) {
            console.log(err);
            res.json({
                status: 'failed',
                success: false,
                message: 'Something went wrong!',
                err: err
            });
        }
        else
            if (feed == null) {
                res.json({
                    status: 'failed',
                    success: false,
                    message: 'Feed does not exists!',
                    err: err
                });
            } else {

                feed.isSold = req.body.isSold;
                // save the feed and check for errors
                feed.save(function (err) {
                    if (err) {
                        res.json({
                            status: 'failed',
                            success: false,
                            message: 'Feed Update failed!' + err.message,
                            err: err
                        });
                        console.log(err.message)
                    }
                    else
                        res.json({
                            status: 'Success',
                            success: true,
                            message: 'Feed Updated Success!',
                            data: feed
                        });
                });
            }

    });

};

// Handle  actions
exports.addtoWishlist = function (req, res) {
    Feeds.findOne({ id: req.params.id }, function (err, feed) {
        console.log('feed:', feed);
        console.log('feedID:', req.params.id);
        if (err) {
            console.log(err);
            res.json({
                status: 'failed',
                success: false,
                message: 'Something went wrong!',
                err: err
            });
        }
        else
            if (feed == null) {
                res.json({
                    status: 'failed',
                    success: false,
                    message: 'Feed does not exists!',
                    err: err
                });
            } else {

                if (req.body.isWishList) {
                    feed.wishlist.push(req.body.createdBy);
                } else {
                    feed.wishlist.remove(req.body.createdBy)
                }

                // save the feed and check for errors
                console.log("updatedFeed", feed)
                feed.save(function (err) {
                    if (err) {
                        res.json({
                            status: 'failed',
                            success: false,
                            message: 'Feed Update failed!' + err.message,
                            err: err
                        });
                        console.log(err.message)
                    }
                    else
                        res.json({
                            status: 'Success',
                            success: true,
                            message: 'Feed Updated Success!',
                            data: feed
                        });
                });
            }

    });

};

// Handle view info
exports.view = function (req, res) {
    Feeds.find({ 'createdBy.uId': req.params.id }, function (err, feed) {
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'Feed details Failed!',
                err: err
            });
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Feed details loading..',
                data: feed
            });
    });
};

// Handle view info
exports.viewWishList = function (req, res) {
    Feeds.find(function (err, feed) {
        //console.log("whsilist", err, feed)
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'Feed details Failed!',
                err: err
            });
        else {
            var data = [];
            feed.forEach(f => {
                f.wishlist.forEach(element => {
                    if (element._id == req.params.id) {
                        data.push(f);
                    }
                });
            });

            console.log("wishlist", data)

            res.json({
                status: 'Success',
                success: true,
                message: 'Feed details loading..',
                data: data
            });
        }

    });
};

// Handle delete
exports.delete = function (req, res) {
    Feeds.remove({
        id: req.params.id
    }, function (err, feed) {
        if (err)
            res.send(err);
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'Feed deleted'
            });
    });
};
