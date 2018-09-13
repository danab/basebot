const MLBGames = require('mlbgames');
// const data = require('./sampleData');

const formatOptions = date => {
	const year = date.toFormat('y');
	const month = date.toFormat('MM');
	const day = date.toFormat('dd');
	return {
		path: `year_${year}/month_${month}/day_${day}/`
	};
};

const getScores = date => {
	return new Promise((fulfill, reject) => {
		const options = formatOptions(date);
		const mlbgames = new MLBGames(options);
		mlbgames.get((err, data) => (err ? reject(err) : fulfill(data)));
	});
};

module.exports = getScores;
