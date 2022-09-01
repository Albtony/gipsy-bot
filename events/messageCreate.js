module.exports = {
	name: 'messageCreate',
	execute: (bot, message) => {
		// no bots, must be in guild
		if (
			message.author.bot ||
			!message.guild
		) 
			return;

		// run Command
		runCmdInBatch(bot, message);
	}
};

function runCmdInBatch(bot, message){
	const inputQueue = message.content.split('\n');
	for (let input of inputQueue){
		runCommand(bot, message, input);
	}
}

function runCommand(bot, message, userCmd){
	if (!userCmd.startsWith(bot.config.PREFIX)) return;
	const args = userCmd.slice(bot.config.PREFIX.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command = 
		bot.commands.get(cmd) || 
		bot.commands.find((c) => {
			return (c.aliases && c.aliases.includes(cmd.toLowerCase()));
		});

	if (!command) {
		message.reply(`"${cmd}" is not a command`);
		return;
	}

	if (command.ownerOnly && !isOwner(message.author.id, bot.config.OWNERSID)) {
		message.reply('You\'re not the owner you dumdum');
		return;
	}

	try {
		command.run(bot, message, args);
	} catch (error) {
		console.error(error);
	}
}

function isOwner(authorId, ownersId) {
	for (const ownerId of ownersId) {
		if (authorId == ownerId) 
			return true;
	}
	return false;
}