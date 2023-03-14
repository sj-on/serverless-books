module.exports = (request, response) => {
	if (request.method === "GET") {
		response
			.status(200)
			.json([
				"playing quickly is playing slowly but quicker.",
				"content. wants. more.",
				"i love john green's books.",
				"at least one of these statements is a lie.",
				"everything discussed in discrete mathematics made sense.",
				"being able to lie is the most useful skill ever. change my mind.",
			]);
	}
	if (request.method === "POST") {
		response.status(200).send("Hello POST");
	}
};

// okay, dude. i have some ideas.
// api auth login that only allows my user to login and post. but anyone can get. a quote. from the api.

// but what if instead of quotes, it's books! with blurbs.

// see for ref: https://www.youtube.com/watch?v=5hvhKgkRzIs
