// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

//configure mongoose as our ORM that will make it simple to query Mongo
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/northwind'); // connect to our database

var Category = require('./models/categoriesModel');


// ROUTES FOR OUR API
// =============================================================================
var northwindRouter = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
northwindRouter.get('/', function(req, res) {
    res.json({ message: 'root route -- app is running!' });   
});

// more routes for our API will happen here

// route to data
northwindRouter.route('/categories')
	.get(function(req,res)
	{
		//var responseJson = {hello: "this is my api"};

		//res.json(responseJson);

		Category.find(function(err,cats)
		{
			if(err)
				console.log(err)
			else
				res.json(cats);
		})
	})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', northwindRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Gulp is running my app on port ' + port);