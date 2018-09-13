const { formatTimeFromGameObj } = require('../utility/helpers');
const getScores = require('../utility/getScores');
const { UNPARSEABLE_DATE } = require('../utility/error_constants');
const getDate = require('../utility/dateParsing');

const requestHandler = async date => {
	try {
		const parsedDate = getDate(date);
		const games = await getScores(parsedDate);
		const scoresText = formatScores(games);
		return formatResponse(parsedDate, scoresText);
	} catch (err) {
		switch (err.message) {
			case UNPARSEABLE_DATE:
				return dateErrorMessage(date);
		}
		return genericErrorMesssage();
	}
};

const formatResponse = (date, scoresText) => {
	const formattedDate = date.toFormat('cccc MMMM d, y');
	const title = `*Scores for ${formattedDate}*\n`;
	return {
		responseType: 'in_channel',
		text: title + scoresText.join('\n')
	};
};

// Code golfy
const formatScores = games =>
	games.map(game => getScoreText(game) + ' - ' + getStatusText(game));

const getScoreText = game => {
	const homeName = game.home_name_abbrev;
	const awayName = game.away_name_abbrev;
	let home = 0;
	let away = 0;
	if (game.linescore && game.linescore.inning && game.linescore.inning.length) {
		home = game.linescore.r.home;
		away = game.linescore.r.away;
	}

	const score = awayName + ': ' + away + ' - ' + homeName + ': ' + home;

	const ret = `<http://mlb.mlb.com/mlb/gameday/index.jsp?gid=${
		game.gameday
	}|${score}>`;
	return ret;
};

const getStatusText = game => {
	// Double headers don't give game time (until the first has finished) apparently
	if (game.game_nbr === '2' && !game.time_date) {
		return 'Game 2';
	}
	switch (game.status.status) {
		case 'In Progress':
			return game.status.inning_state + ' ' + game.status.inning;
		case 'Warmup':
		case 'Preview':
		case 'Pre-Game':
			return formatTimeFromGameObj(game);
		case 'Final':
			// Nothing special
			return 'Final';
		default:
			return game.status.status;
	}
};

const dateErrorMessage = date => ({
	responseType: 'ephemeral',
	text: `I couldn't figure out what date you meant by \`${date}\`. Please try something in the following formats \`/scores 9/1/2018\` or \`/scores 8-30\`. Or just type \`/scores\` for the latest games.`
});

const genericErrorMesssage = () => ({
	responseType: 'ephemeral',
	text: "Couldn't find any scores. Sorry!"
});

module.exports = requestHandler;
