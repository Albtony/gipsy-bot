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
- terminates the bot - `,,killbot`
- recompiles any js file under commands directory - `,,hotload`
- checks whether you are owner or not - `,,pingmedaddy`
- a general function just for debugging stuff - `,,debug`

## 📷 Bot in Action!

<ul>
  <li><img alt="demo-play" src="https://user-images.githubusercontent.com/78489357/194025580-4378aa5d-c8fa-4bcb-be92-6ec142c08372.png" height=154 width=500/>
  <li><img alt="demo-queue" src="https://user-images.githubusercontent.com/78489357/194027059-6a888450-3d78-4687-a320-1da1d1b323d6.png" width=500/>
  <li><img alt="demo-shuffle" src="https://user-images.githubusercontent.com/78489357/194027468-5266fb61-98ba-45b9-90b0-b255eb27efd6.png" width=500/>
  <li><img alt="demo-help" src="https://user-images.githubusercontent.com/78489357/194027918-15a53b12-29ed-4bbe-8251-57e4f9481dc8.png" width=500/>
  <li><img alt="demo-pingmedaddy" src="https://user-images.githubusercontent.com/78489357/194028298-a3ca05c0-e8af-4de7-b3e2-7f24d2e2fb25.png" width=500/>
</ul>
