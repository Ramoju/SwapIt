// Import  model
Chat = require('../model/chatModel')

// Handle index actions
exports.index = function (req, res) {
    console.log('Request', req.params.id)
    Chat.find({ $or: [{ 'ownerID': req.params.id }, { 'senderID': req.params.id }] },
        function (err, chatlist) {
            if (err)
                res.send({
                    status: 'failed',
                    success: false,
                    message: 'Feed details Failed!',
                    err: err
                });
            else{
                console.log(chatlist)
                res.json({
                    status: 'Success',
                    success: true,
                    message: 'Feed details loading..',
                    data: chatlist
                });
            }
               
        });
};

// Handle  actions
exports.sendMessage = function (req, res) {
    Chat.findOne({ roomId: req.body.feedId + ':-:' + req.body.userId }, function (err, chat) {
        console.log('chat:', chat);
        console.log('chatID:', req.body.feedId + ':-:' + req.body.userId);
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
            if (chat == null) {
                var newChat = new Chat();
                newChat.roomId = req.body.feedId + ':-:' + req.body.userId;
                newChat.senderID = req.body.userId;
                newChat.senderName = req.body.userName;
                newChat.feedId = req.body.feedId;
                newChat.feedTitle = req.body.feedTitle;
                newChat.ownerID = req.body.ownerID;
                newChat.ownerName = req.body.ownerName;

                console.log('Request', req.body);

                var messageData = []
                messageData.push(req.body.message)
                newChat.messages = messageData;

                newChat.save(function (err) {
                    if (err) {
                        res.json({
                            status: 'failed',
                            success: false,
                            message: 'New chat failed!' + err.message,
                            err: err
                        });
                        console.log(err.message)
                    }
                    else
                        res.json({
                            status: 'Success',
                            success: true,
                            message: 'Chat Saved!',
                            data: newChat
                        });
                });
            } else {

                var messageData = chat.messages;
                messageData.push(req.body.message)
                chat.messages = messageData;

                // save the chat and check for errors
                chat.save(function (err) {
                    if (err) {
                        res.json({
                            status: 'failed',
                            success: false,
                            message: 'Send message failed!' + err.message,
                            err: err
                        });
                        console.log(err.message)
                    }
                    else
                        res.json({
                            status: 'Success',
                            success: true,
                            message: 'Send Message Success!',
                            data: chat
                        });
                });
            }

    });

};

// Handle view info
exports.view = function (req, res) {
    Chat.find({ 'id': req.params.id }, function (err, chat) {
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
                data: chat
            });
    });
};


exports.viewByRoom = function (req, res) {
    Chat.findOne({ 'roomId': req.params.id }, function (err, chat) {
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
                data: chat
            });
    });
};

exports.delete = function (req, res) {
    Chat.remove({
        id: req.params.id
    }, function (err, chat) {
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
