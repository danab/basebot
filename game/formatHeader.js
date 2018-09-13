const formatPreviewHeader = game => {
	const homeTeam = `${game.home_team_city} ${game.home_team_name}`;
	const homeRecord = `(${game.home_win}-${game.home_loss})`;
	const awayTeam = `${game.away_team_city} ${game.away_team_name}`;
	const awayRecord = `(${game.away_win}-${game.away_loss})`;
	return `${homeTeam} ${homeRecord} vs. ${awayTeam} ${awayRecord}`;
};

module.exports = formatPreviewHeader;
