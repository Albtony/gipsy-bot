module.exports = {
	name: 'cmq',
	aliases: [],
	description: 'clears music queue',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
        bot.musicQueue = [];
        message.channel.send("mq cleared");
	}
};