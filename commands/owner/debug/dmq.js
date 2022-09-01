module.exports = {
	name: 'dbvc',
	aliases: [],
	description: 'destroys bot voiceconnection',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
        bot.voiceConnection = null;
        message.channel.send(`\`\`\`bvc destroyed\`\`\``);
	}
};