const request = require('request-promise-native');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

module.exports.authorizer = code => {
	const clientId = process.env.SLACK_CLIENT_ID;
	const clientSecret = process.env.SLACK_CLIENT_SECRET;

	const oauthURL = `https://slack.com/api/oauth.access?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

	const options = {
		url: oauthURL,
		json: true
	};

	return request(options);
};

module.exports.getSuccessHTML = () =>
	new Promise((res, rej) => {
		fs.readFile(path.resolve(__dirname, './success.html'), (err, html) => {
			console.log(err, html);
			if (!err) {
				res(html.toString('utf8'));
			} else {
				rej(err);
			}
		});
	});
