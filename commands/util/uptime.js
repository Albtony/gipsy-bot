module.exports = {
	name: 'uptime',
	description: 'prints the bot uptime in readable format',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message) => {
		const totalSeconds = (bot.uptime / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor(totalSeconds % 86400 / 3600);
		const minutes = Math.floor(totalSeconds % 3600 / 60);
		const seconds = Math.floor(totalSeconds % 60);

		message.channel.send(`\`\`\`Uptime: ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds \`\`\``);
	}
};