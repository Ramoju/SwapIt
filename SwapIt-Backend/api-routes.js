// Initialize express router
let router = require('express').Router();
const bodyParser = require("body-parser");

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
}).single("demo_image");

router.use(bodyParser.json());
// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to SwapIT app!'
  });
});

// Import contact controller
var userController = require('./controler/usersControler');
// User routes
router.route('/users')
  .get(userController.index)
  .post(userController.signUp);

router.route('/users/:id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

router.route('/users/byEmail/:email')
  .post(userController.login)
  .put(userController.updatePassword);


// Import contact controller
var feedController = require('./controler/feedsControler');
// User routes
router.route('/feeds')
  .get(feedController.index)
  .post(feedController.addNewFeed);

router.route('/feeds/:id')
  .get(feedController.view)
  .patch(feedController.markFeedAsSold)
  .put(feedController.markFeedAsSold)
  .delete(feedController.delete);

router.route('/wishlist/:id')
  .post(feedController.addtoWishlist)
  .get(feedController.viewWishList)

// Import contact controller
var chatController = require('./controler/chatControler');
// User routes
router.route('/chats')
  .put(chatController.index)
  .post(chatController.sendMessage);

router.route('/chats/:id')
  .get(chatController.view)
  .put(chatController.viewByRoom)

router.route('/chatlist/:id')
  .get(chatController.index)
  .delete(chatController.delete)

module.exports = router;