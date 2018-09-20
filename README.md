# Basebot

## Install

If you want to install `Basebot` use the link below.

<a href="https://slack.com/oauth/authorize?client_id=347806718947.352926977719&scope=commands"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

## What is it?

Use Basebot to get baseball scores straight to Slack. Just what you've always wanted!

## How to Use

Basebot includes two slash commands, `/scores [optional date]` and `/game [team] [optional date]`

### /scores

`/scores` can be used by itself to get the latest baseball scores. If you'd like to look at the scores for a certain date you may add a date. Basebot understands `yesterday`, `today`, `tomorrow` and dates of the format `m/d` and `m/d/yyyy`.

#### Example 1

![simple /scores](https://user-images.githubusercontent.com/1112365/45724585-e06b3680-bb84-11e8-9a84-16b5515c10fc.gif)

#### Example 2

![/scores yesterday](https://user-images.githubusercontent.com/1112365/45724587-e103cd00-bb84-11e8-8acd-38a28d272630.gif)

#### Example 3

![/scores 7/12](https://user-images.githubusercontent.com/1112365/45724588-e103cd00-bb84-11e8-94e1-a0b4096a51ac.gif)

### /game

`/game` requires a team after, e.g. `/game bos`. The command recognizes the following teams: `ARI`, `ATL`, `BAL`, `BOS`, `RED SOX`, `CHC`, `CIN`, `CLE`, `COL`, `CWS`, `DET`, `HOU`, `KC`, `LAA`, `LAD`, `MIA`, `MIL`, `MIN`, `NYM`, `NYY`, `OAK`, `PHI`, `PIT`, `SD`, `SEA`, `SF`, `STL`, `TB`, `TEX`, `TOR`, `WSH`.

You also may add a date after the team, e.g. `/game bos 10/30/2013`.

If you forget how it works, you can use `/game help` for a reminder.

#### Example 1

![/game bos](https://user-images.githubusercontent.com/1112365/45724589-e103cd00-bb84-11e8-8493-5e76a9bc65e7.gif)

#### Example 2

![/game bos ](https://user-images.githubusercontent.com/1112365/45724591-e103cd00-bb84-11e8-951c-6c95fa715b0d.gif)

## Help!

For support, the best way to reach me is to open an [issue](https://github.com/danab/basebot/issues). If you prefer you may also e-mail me at danab@outlook.com.
