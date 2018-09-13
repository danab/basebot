const getDate = require('../utility/dateParsing');
const { getTeam } = require('../utility/team_abbrev');
const {
	NO_TEAM_PROVIDED,
	INVALID_TEAM_NAME
} = require('../utility/error_constants');

const parseText = text => {
	if (!text.length) {
		throw new Error(NO_TEAM_PROVIDED);
	}
	// First assume that no date is provided
	let team = getTeam(text);

	if (team) {
		return { team, date: getDate() };
	}

	// Check if a date is included
	const words = text.split(' ');

	// Only one word was included, and it wasn't a recognizable team
	if (words.length < 2) {
		throw new Error(INVALID_TEAM_NAME);
	}
	// Allow for multiple word teams (i.e. "Red Sox")
	const unparsedTeam = words.slice(0, words.length - 1).join(' ');
	team = getTeam(unparsedTeam);

	if (!team) {
		throw new Error(INVALID_TEAM_NAME);
	}

	const unparsedDate = words[words.length - 1];
	const date = getDate(unparsedDate);

	return { team, date };
};

module.exports = parseText;
