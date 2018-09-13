const getScores = require('../utility/getScores');
const sendHelpText = require('./help');
const parseText = require('./parseText');
const formatLineScore = require('./formatLineScore');
const formatPreview = require('./formatPreview');

const {
	NO_TEAM_PROVIDED,
	NO_GAMES_FOUND,
	NO_TEAM_FOUND,
	INVALID_TEAM_NAME,
	UNPARSEABLE_DATE
} = require('../utility/error_constants');

const requestHandler = async text => {
	if (text === 'help') {
		return sendHelpText();
	}
	try {
		const { team, date } = parseText(text);

		const scores = await getScores(date);

		const desiredGames = findGame(scores, team);

		if (!desiredGames.length) {
			throw new Error(NO_TEAM_FOUND);
		}

		const attachments = desiredGames.map(game => formatAttachment(game));
		return {
			responseType: 'ephemeral',
			attachments
		};
	} catch (err) {
		return catchError(err.message, text);
	}
};

const findGame = (games, team) => {
	if (games && games.length) {
		// We could have double headers
		const teamName = team.toLowerCase();
		return games.filter(game => {
			return (
				game.home_name_abbrev.toLowerCase() === teamName ||
				game.away_name_abbrev.toLowerCase() === teamName
			);
		});
	} else {
		throw new Error(NO_GAMES_FOUND);
	}
};

const formatAttachment = game => {
	const { linescore } = game;

	if (!linescore || !linescore.inning || !linescore.inning.length) {
		return formatPreview(game);
	} else {
		return formatLineScore(game);
	}
};

const catchError = (errMessage, team) => {
	let text;
	switch (errMessage) {
		case NO_TEAM_PROVIDED:
			text =
				'Please provide a team name to look up. Type `/game help` for a list of teams I recognize.';
			break;
		case INVALID_TEAM_NAME:
			text =
				'Unable to recognize team: `' +
				team +
				'`. Type `/game help` for a list of teams I recognize.';
			break;
		case UNPARSEABLE_DATE:
			text =
				'I was unable to figure out what date you wanted. Try something like `/game BOS 9/1/2018` or `/game LAD 09-02`';
			break;
		case NO_GAMES_FOUND:
			text = 'No MLB games found for ' + team + '. All-Star break? Offseason? ';
			break;
		case NO_TEAM_FOUND:
			text = 'No games found for `' + team + '`. Maybe they were off that day?';
			break;
		default:
			text = 'An unknown error has occurred. ¯_(ツ)_/¯';
	}

	return {
		responseType: 'ephemeral',
		text
	};
};

module.exports = requestHandler;
