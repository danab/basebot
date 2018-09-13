const DateTime = require('luxon').DateTime;

// Can assume Eastern
const getUnixFromGameObj = game => {
	const gameTime = game.time_date + game.ampm + ' ' + 'America/New_York';
	const unixEpoch =
		DateTime.fromFormat(gameTime, 'yyyy/MM/dd h:mma z').valueOf() / 1000;

	return unixEpoch;
};

const formatTimeFromGameObj = game => {
	const unixEpoch = getUnixFromGameObj(game);
	const defaultText = `${game.time} ${game.ampm}`;
	return formatTime(unixEpoch, defaultText);
};
const formatTime = (unixEpoch, defaultText) =>
	`<!date^${unixEpoch}^{time}|${defaultText}>`;

module.exports = {
	formatTimeFromGameObj
};
