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
		//Step One - test route

		//var responseJson = {hello: "this is my api"};

		//res.json(responseJson);

		//------------------------------

		//Step Two - wire up mongoose to find all records and send error if it happens
		// eg http://localhost:3000/api/categories

		// Category.find(function(err,cats)
		// {
		// 	if(err)
		// 		res.status(500).send(err);
		// 	else
		// 		res.json(cats);
		// })

		//-------------------------------

		//Step Three - introduce a query string to filter records like http://localhost:3000/api/categories?CategoryName=Produce

		// var query = req.query;

		// Category.find(query,function(err,cats)
		// {
		// 	if(err)
		// 		res.status(500).send(err);
		// 	else
		// 		res.json(cats);
		// })

		//--------------------------------

		// Step Four -- add safety to query string to prevent bad queries like 
		// http://localhost:3000/api/categories?sssfdsfs
		// this will make sure that a valid query string works

		var query = {};

		if(req.query.CategoryName)
		{
			query.CategoryName = req.query.CategoryName;
		}

		Category.find(query,function(err,cats)
		{
			if(err)
				res.status(500).send(err);
			else
				res.json(cats);
		})


	});

northwindRouter.route('/categories/:categoryId')
	.get(function(req,res)
	{
		Category.findById(req.params.categoryId,function(err,cat)
		{
			if(err)
				res.status(500).send(err);
			else
				res.json(cat);
		})
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', northwindRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Gulp is running my app on port ' + port);