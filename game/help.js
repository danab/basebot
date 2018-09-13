const { DateTime } = require('luxon');
const { formatTeams } = require('../utility/team_abbrev');

const sendHelpText = () => {
	const year = DateTime.local().toFormat('y');
	const lines = [
		':baseball::baseball::baseball::baseball:',
		'I recognize commands of the form `/game TEAM OPTIONAL-DATE`',
		'I currently recognize the following teams:',
		formatTeams,
		'For dates, I do my best to parse dates of the form `mm/dd/yyyy`. If you leave off the year I will assume you mean ' +
			year,
		'For example, try `/game BOS 9/1`. Have fun!',
		':baseball::baseball::baseball::baseball:'
	];

	return {
		responseType: 'ephemeral',
		text: lines.join('\n')
	};
};

module.exports = sendHelpText;
