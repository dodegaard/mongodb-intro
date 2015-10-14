var express = require('express');

var routes = function(Category)
{
	var northwindRouter = express.Router();              // get an instance of the express Router

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	northwindRouter.get('/', function(req, res) {
	    res.json({ message: 'root route -- app is running!' });   
	});

	// more routes for our API will happen here

	// route to data
	northwindRouter.route('/categories')
		.post(function(req, res)
		{
			var cat = new Category(req.body);

			cat.save();
			res.status(201).send(cat);
		})


		.get(function(req,res)
		{
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

}