// get necessary packages
const { Client, Collection, Intents } = require('discord.js');
const { hotLoadCommands, hotLoadEvents, hotLoadSlashCommands } = require('./utils/loader.js');
const config = require('./config.json');

// create client instance
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ] });

bot.config = config;
bot.voiceConnection;

bot.commands = new Collection();
bot.slashCommands = new Collection();

bot.musics = {
    player: '',
    queue: [],
    pos: 0,
    skip: 1,
    loop: false
};

// reacts on event
hotLoadEvents(bot);

// loads command
hotLoadCommands(bot);

// loads slash command
hotLoadSlashCommands(bot);

// login to discord with bot's token
bot.login(config.TOKEN);