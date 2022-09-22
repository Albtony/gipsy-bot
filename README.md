# 🤖 GipsyBot
GipsyBot is a Discord Music Bot and a passion project of mine that is built with Node.js and discord.js v13 with some references to **[EvoBot](https://github.com/eritislami/evobot)**

## 🚀 Getting Started
Some requirements you have to fulfill:
1. You neet to set up a discord bot **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**  
2. Enable 'Message Content Intent' in Discord Developer Portal
3. Install Node.js 16.11.0 or newer

Installing the bot:
```sh
git clone https://github.com/Albtony/gipsy-bot.git
cd gipsy-bot
npm install
```
After installation finishes follow configuration instructions then run `index.js` to start the bot.

## ⚙️ Configuration
Copy or Rename `config.json.template` to `config.json` and fill out the values:<br>
⚠️ **Note: Never commit or share your token or api keys publicly** ⚠️
```json
{
  "TOKEN": "<your_bot_token>",
  "PREFIX": ",,",
  "OWNERSID": ["<dev/owner_id>"]
}
```

## 📝 Features
These are the current features of this bot:

🎵 Music 🎵
- play youtube video via link - `,,p or ,,play`
- music queue system - `,,q or ,,queue`
- loop queue - `,,l or ,,loop`
- shuffle queue - `,,s or ,,shuffle`
- now playing - `,,np or ,,nowplaying`
- skip x amount of song - `,,s or ,,skip`

✏️ Util ✏️
- lists all user command - `,,help`
- prints your local time - `,,now`
- picks random element from args - `,,pick`
- checks discord and api latency - `,,ping`
- checks bot uptime - `,,uptime`

👨 Owner/Dev Only 👩
- terminate the bot - `,,killbot`
- recompile any js file under commands directory - `,,hotload`
- check wheter you are owner or not - `,,pingmedaddy`
- a general function just for debugging stuff - `,,debug`
