const { promisify } = require('node:util');
const { glob } = require('glob');

const globPromise = promisify(glob);

module.exports = {
	// set commands to require its respective file recursively
	hotLoadCommands: async (bot) => {
		const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
		commandFiles.map((dir) => {
			delete require.cache[require.resolve(dir)];
			const command = require(dir);
			const individualFolder = dir.split('/');
			const folderindex = individualFolder.length - 2;
			const folder = individualFolder[folderindex];
			const properties = { directory: folder, ...command };
		
			bot.commands.set(command.name, properties);
		});
	},

	// set events to requre its respective file recursively
	hotLoadEvents: async (bot) => {
		const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
		eventFiles.map((dir) => {
			const event = require(dir);
			if (event.once) {
				bot.once(event.name, (...args) => { event.execute(bot, ...args); });
			} else {
				bot.on(event.name, (...args) => { event.execute(bot, ...args); });
			}
		});
	},

	// set slash commands to require its respective file recursively
	hotLoadSlashCommands: async (bot) => {
		const arrayOfSlashCommands = [];
		const slashCommandsFiles = await globPromise(`${process.cwd()}/slashCommands/**/*.js`);
		slashCommandsFiles.map((dir) => {
			delete require.cache[require.resolve(dir)];
			const slashCommand = require(dir);
			arrayOfSlashCommands.push(JSON.stringify(slashCommand));
			bot.slashCommands.set(slashCommand.name, slashCommand);
		});
	}
};