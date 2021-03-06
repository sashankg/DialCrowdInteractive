# DialCrowd Interactive Test Interface

Chat interface for crowdsourced testing of dialogue systems through DialCrowd

## Get Started
```
git clone https://github.com/sashankg/DialCrowdInteractive.git
cd DialCrowdInteractive
npm install
npm start
```
### Required URL paramters
- `ip` : remote agent IP address
- `userID` : generated by DialCrowd
- `subId` : Amazon worker's ID
- `name_of_dialog` : user decided name of dialog system

### Optional URL parameters
- `option` : `both` (default), `text`, `speech`, or `continuous`
- `help` : text to appear in help menu

#### Example URL
```
[URL]/?ip=128.2.211.88:3343&userID=1232023923&subId=SUBID_1234&name_of_dialog=systemA&option=continuous&help=Hello%20world
```

## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sashankg/DialCrowdInteractive/)
