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

const booksSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	blurb: {
		type: String,
		required: true,
	},
});

const Books = mongoose.model("Books", booksSchema);

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
