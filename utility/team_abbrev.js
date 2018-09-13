const abbrevs = {
	ARI: 'ARI',
	ATL: 'ATL',
	BAL: 'BAL',
	BOS: 'BOS',
	'RED SOX': 'BOS',
	CHC: 'CHC',
	CIN: 'CIN',
	CLE: 'CLE',
	COL: 'COL',
	CWS: 'CWS',
	DET: 'DET',
	HOU: 'HOU',
	KC: 'KC',
	LAA: 'LAA',
	LAD: 'LAD',
	MIA: 'MIA',
	MIL: 'MIL',
	MIN: 'MIN',
	NYM: 'NYM',
	NYY: 'NYY',
	OAK: 'OAK',
	PHI: 'PHI',
	PIT: 'PIT',
	SD: 'SD',
	SEA: 'SEA',
	SF: 'SF',
	STL: 'STL',
	TB: 'TB',
	TEX: 'TEX',
	TOR: 'TOR',
	WSH: 'WSH'
};

const getTeam = team => abbrevs[team.toUpperCase()];
const formatTeams = Object.keys(abbrevs)
	.map(name => '`' + name + '`')
	.join(', ');

module.exports = { getTeam, formatTeams };
