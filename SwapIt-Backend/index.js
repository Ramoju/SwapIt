//Import express
let express = require('express')
// Initialize the app
let app = express();
// Setup server port
// Import routes
let apiRoutes = require("./api-routes")
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ limit: "50mb" }))

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/swapit', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
var db = mongoose.connection;   

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Swapit Api's on port " + port);
});
// Use Api routes in the App
app.use('/api', apiRoutes)

