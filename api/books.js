// const dotenv = require("dotenv");
// dotenv.config();
// "dotenv": "^16.0.3",

const mongoose = require("mongoose");

const url = process.env.DB_URI;

mongoose.set("strictQuery", false);
mongoose
	.connect(url)
	.then((result) => {
		console.log("DB Connected Successfully: " + result);
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const Books = require("../models/books");

module.exports = (request, response) => {
	if (request.method === "GET") {
		Books.find()
			.then((books) => {
				response.status(200).json(books);
			})
			.catch((error) => response.status(500).json(error.message));
	} else if (request.method === "POST") {
		const book = new Books({
			title: request.body.title,
			blurb: request.body.blurb,
		});
		book
			.save()
			.then((savedBook) => {
				response.json(savedBook).status(200);
			})
			.catch((error) => response.status(500).json(error.message));
	}
};

// to do:
// factorise the code into seperate modules <- probably won't do. if it ain't broke, don't fix it. <- if i won't try, i won't know it.
// return only one book at a time via get. prefer db related function over math.random <- i'll instead cache the results on the frontend, because otherwise it will be too many db reads.

// todo: authenticated post route.
