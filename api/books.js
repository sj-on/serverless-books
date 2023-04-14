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

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


const handler = (request, response) => {
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

module.exports = allowCors(handler);

// to do:
// factorise the code into seperate modules <- probably won't do. if it ain't broke, don't fix it. <- if i won't try, i won't know it.
// return only one book at a time via get. prefer db related function over math.random <- i'll instead cache the results on the frontend, because otherwise it will be too many db reads.

// todo: authenticated post route.
