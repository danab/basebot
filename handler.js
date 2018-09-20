const querystring = require('querystring');

const { authorizer, getSuccessHTML } = require('./authorizer/authorizeRequest');
const scoresHandler = require('./scores/scoresHandler');
const gameHandler = require('./game/gameHandler');

const errorResp = {
	responseType: 'ephemeral',
	text: 'An unknown error has occurred. Sorry! ¯_(ツ)_/¯'
};

module.exports.authorization = async event => {
	try {
		// I don't understand oauth much, do I need to do anything with this?
		const code = event.queryStringParameters.code;
		const resp = await authorizer(code); // eslint-disable-line no-unused-vars
		const html = await getSuccessHTML();

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'text/html'
			},
			body: html
		};
	} catch (err) {
		console.error(err); // eslint-disable-line no-console
		return {
			statusCode: 500,
			body:
				'Error! Authorization probably did not happen, for an unknown reason. Please try again?\n\nContact github.com/danab/basebot to report ongoing issues.'
		};
	}
};

module.exports.game = async event => {
	try {
		const { text } = querystring.parse(event.body);
		const resp = await gameHandler(text);
		return {
			statusCode: 200,
			body: JSON.stringify(resp)
		};
	} catch (err) {
		return {
			statusCode: 200,
			body: JSON.stringify(errorResp)
		};
	}
};

module.exports.scores = async event => {
	try {
		const { text } = querystring.parse(event.body);
		const resp = await scoresHandler(text);

		return {
			statusCode: 200,
			body: JSON.stringify(resp)
		};
	} catch (err) {
		return {
			statusCode: 200,
			body: JSON.stringify(errorResp)
		};
	}
};
