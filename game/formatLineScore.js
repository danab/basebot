const formatHeader = require('./formatHeader');

const formatLineScore = game => {
	const { away_name_abbrev, home_name_abbrev, linescore, gameday } = game;
	var homeScores = [];
	var awayScores = [];
	linescore.inning.forEach(function(inning) {
		if (inning.home) {
			homeScores.push(inning.home);
		} else {
			homeScores.push(' ');
		}
		if (inning.away) {
			awayScores.push(inning.away);
		} else {
			awayScores.push(' ');
		}
	});

	const top = formatLineHeader(linescore);

	const awayLine = formatLine(awayScores, away_name_abbrev, top.length);
	const homeLine = formatLine(homeScores, home_name_abbrev, top.length);

	const {
		r: { away: runsAway, home: runsHome },
		h: { away: hitsAway, home: hitsHome },
		e: { away: errorsAway, home: errorsHome }
	} = linescore;

	const awayTotals = formatTotals(runsAway, hitsAway, errorsAway);
	const homeTotals = formatTotals(runsHome, hitsHome, errorsHome);

	const fullAwayLine = awayLine + awayTotals + '\n';
	const fullHomeLine = homeLine + homeTotals + '\n';

	const message = top + fullAwayLine + fullHomeLine;

	return {
		text: '```' + message + '```',
		title: formatHeader(game),
		title_link: `http://mlb.mlb.com/mlb/gameday/index.jsp?gid=${gameday}`
	};
};

const formatLineHeader = linescore => {
	let top = '       1   2   3   4   5   6   7   8   9 ';
	if (linescore.inning.length > 8) {
		let extraInnings = linescore.inning.length;
		let extraInning = 10;
		while (extraInning <= extraInnings) {
			top += ' ' + extraInning + ' ';
			extraInning += 1;
		}
	}

	top += '      R   H   E   \n';
	return top;
};

const formatLine = (scores, name, topLineLength) => {
	let line =
		leftPad(name, 3) + ' ' + scores.map(score => leftPad(score, 4)).join('');

	if (line.length < topLineLength - 16) {
		line = rightPad(line, topLineLength - 16);
	}
	return line;
};

const formatTotals = (runs, hits, errors) => {
	return leftPad(runs, 4) + leftPad(hits, 4) + leftPad(errors, 4);
};

const rightPad = (string, length) => {
	let newString = (string + '             ').substring(0, length);
	if (newString.length !== length) {
		return rightPad(newString, length);
	}

	return newString;
};

const leftPad = (string, length) => {
	return ('             ' + string).slice(-1 * length);
};

module.exports = formatLineScore;
