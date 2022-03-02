const fs = require('node:fs');

module.exports={
    // set command to require its respective file
	hotLoadCommands (bot) {
		bot.commands.sweep(() => true);
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			delete require.cache[require.resolve(`../commands/${file}`)];
			const command = require(`../commands/${file}`);
			bot.commands.set(command.name, command);
		}
	},

    // set event to require its respective file
    hotLoadEvents (bot) {
		const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
		for (const file of eventFiles) {
			const event = require(`../events/${file}`);
			if (event.once) {
				bot.once(event.name, (...args) => event.execute(bot, ...args));
			} else {
				bot.on(event.name, (...args) => event.execute(bot, ...args));
			}
		}
	}
}