const DateTime = require('luxon').DateTime;

const { UNPARSEABLE_DATE } = require('./error_constants');

const getDate = date => {
	// If it doesn't exist, let's make a smart choice of dates
	if (!date) {
		return (
			DateTime.local()
				// switch to "today" at 11
				.minus({ hours: 11 })
				.setZone('America/New_York')
		);
	}

	switch (date.toLowerCase()) {
		case 'today':
			return DateTime.local().setZone('America/New_York');
		case 'yesterday':
			return DateTime.local()
				.minus({ days: 1 })
				.setZone('America/New_York');
		case 'tomorrow':
			return DateTime.local()
				.plus({ days: 1 })
				.setZone('America/New_York');
	}

	// Must be in correct format (mm-dd(-yyyy))
	return attemptParse(date);
};

//
const attemptParse = date => {
	// This regex is of course not quite correct, but it should catch a lot of things.
	let [month, day, year] = date.split(/\/|-/);

	if (!day) {
		throw new Error(UNPARSEABLE_DATE);
	} else if (!year) {
		year = DateTime.local().toFormat('y');
	}

	const possibleDate = DateTime.local(+year, +month, +day);
	if (!possibleDate.isValid) {
		throw new Error(UNPARSEABLE_DATE);
	}

	return possibleDate;
};

module.exports = getDate;
