const querystring = require('querystring');

const authorizer = require('./authorizer/authorizeRequest');
const scoresHandler = require('./scores/scoresHandler');
const gameHandler = require('./game/gameHandler');

module.exports.authorization = async event => {
	const code = event.queryStringParameters.code;
	try {
		// I don't understand oauth much, do I need to do anything with this?
		const resp = await authorizer(code); // eslint-disable-line no-unused-vars
		return {
			statusCode: 200,
			body: 'Authorization happened'
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: 'Authorization probably did not happen. Dunno.'
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
		const resp = {
			responseType: 'ephemeral',
			text: 'An unknown error has occurred. Sorry! ¯_(ツ)_/¯'
		};
		return {
			statusCode: 200,
			body: JSON.stringify(resp)
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
		const resp = {
			responseType: 'ephemeral',
			text: 'An unknown error has occurred. Sorry! ¯_(ツ)_/¯'
		};
		return {
			statusCode: 200,
			body: JSON.stringify(resp)
		};
	}
};
