const { formatTimeFromGameObj } = require('../utility/helpers');
const formatHeader = require('./formatHeader');

const formatPreview = game => {
	const header = formatHeader(game);
	const homePitcher = formatPitcher(game.home_probable_pitcher);
	const awayPitcher = formatPitcher(game.away_probable_pitcher);
	const link = 'http://mlb.com' + game.links.preview;
	return createPreviewJSON(header, homePitcher, awayPitcher, game, link);
};

const formatPitcher = pitcher => {
	return `${pitcher.first} ${pitcher.last} (${pitcher.wins}-${pitcher.losses} ${
		pitcher.era
	} ERA)`;
};

const createPreviewJSON = (header, homePitcher, awayPitcher, game, link) => {
	return {
		fallback: `${header}\n${awayPitcher}\n${awayPitcher}`,
		title: header,
		title_link: link,
		text: awayPitcher + '\n' + homePitcher,
		footer: `Game Time: ${formatTimeFromGameObj(game)}`
	};
};

module.exports = formatPreview;
