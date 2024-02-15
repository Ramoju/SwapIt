// Import contact model
User = require('../model/userModel');

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, userList) {
        if (err) {
            res.json({
                status: "error",
                success: false,
                message: err,
            });
            console.log("user-result-error", err.message)
        } else {
            console.log("user-result", userList)
            res.json({
                status: "success",
                success: true,
                message: "User retrieved successfully",
                data: userList
            });
        }
    });
};

// Handle create User actions
exports.signUp = function (req, res) {
    User.findOne({ userEmail: req.body.userEmail }, function (err, user) {
        console.log('user:', user);
        console.log('email:', req);
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
            if (user != null) {
                res.json({
                    status: 'failed',
                    success: false,
                    message: 'User already exists!',
                    err: err
                });
            } else {
                var newUser = new User();
                newUser.name = req.body.name;
                newUser.userEmail = req.body.userEmail;
                newUser.pwd = req.body.pwd;
                newUser.lastSeen = req.body.lastSeen;

                // save the User and check for errors
                newUser.save(function (err) {
                    if (err) {
                        res.json({
                            status: 'failed',
                            success: false,
                            message: 'New User failed!' + err.message,
                            err: err
                        });
                        console.log(err.message)
                    }
                    else
                        res.json({
                            status: 'Success',
                            success: true,
                            message: 'New User created!',
                            data: newUser
                        });
                });
            }

    });

};


// Handle create User actions
exports.updatePassword = function (req, res) {
    User.findOne({ userEmail: req.params.email }, function (err, user) {
        console.log('user:', user);
        console.log('email:', req.params.email);
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
            if (user == null) {
                res.json({
                    status: 'failed',
                    success: false,
                    message: 'User does not exists!',
                    err: err
                });
            } else {

                user.pwd = req.body.pwd;
                // save the User and check for errors
                user.save(function (err) {
                    if (err) {
                        res.json({
                            status: 'failed',
                            success: false,
                            message: 'User Update failed!' + err.message,
                            err: err
                        });
                        console.log(err.message)
                    }
                    else
                        res.json({
                            status: 'Success',
                            success: true,
                            message: 'Password Updated Success!',
                            data: user
                        });
                });
            }

    });

};

// Handle view User info
exports.view = function (req, res) {
    User.findOne({ uid: req.params.id }, function (err, userList) {
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'User details Failed!',
                err: err
            });
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'User details loading..',
                data: userList
            });
    });
};

// Handle Login User 
exports.login = function (req, res) {
    User.findOne({ userEmail: req.params.email })
    .populate()
    .exec(function (err, userList) {
        if (err)
            res.send({
                status: 'failed',
                success: false,
                message: 'Something went wrong!',
                err: err
            });
        else {
            console.log('login_user', userList);
            if (userList != null) {
                if (userList.pwd == req.body.pwd)
                    res.json({
                        status: 'Success',
                        success: true,
                        message: 'User login success.',
                        data: userList
                    });
                else
                    res.json({
                        status: 'Failed',
                        success: false,
                        message: 'User email or pasword is incorrect!',
                    });
            } else {
                res.json({
                    status: 'Failed',
                    success: false,
                    message: 'No user record found!',
                });
            }
        }
    })
        ;
};

// Handle update User info
exports.update = function (req, res) {
    User.findOne({ uid: req.params.id }, function (err, user) {
        if (err)
            res.json({
                status: 'failed',
                success: false,
                message: 'update User Failed!',
                err: err
            });
        else {

            // update the User and check for errors
            user.save(function (err) {
                if (err)
                    res.json({
                        status: 'failed',
                        success: false,
                        message: 'New User created!',
                        err: err
                    });
                else
                    res.json({
                        status: 'Success',
                        success: true,
                        message: 'New User created!',
                        data: user
                    });
            });
        }

    });
};

// Handle delete User
exports.delete = function (req, res) {
    User.remove({
        uid: req.params.id
    }, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json({
                status: 'Success',
                success: true,
                message: 'User deleted'
            });
    });
};
