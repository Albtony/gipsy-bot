module.exports = {
	name: 'ping',
	description: 'prints the bot and discord API ping',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message) => {
		const botp = Date.now() - message.createdTimestamp;
		const APIp = bot.ws.ping;
		message.channel.send(`\`\`\`Bot latency: ${botp}ms, API latency: ${APIp}ms\`\`\``);
	}
};