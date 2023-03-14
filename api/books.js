const db = require("diskdb");
db.connect("database", ["books"]);

module.exports = (request, response) => {
	if (request.method === "GET") {
		const books = db.books.find();
		response.status(200).json(books);
	} else if (request.method === "POST") {
		const book = request.body;
		db.books.save(book);
		response.status(200).json(book);
	}
};
