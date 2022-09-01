module.exports = {
	name: 'pbvcs',
	aliases: [],
	description: 'prints bot voice connection status',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
        if (!bot.voiceConnection) {
            message.channel.send("there is no bvc");
        } else {
            console.log(bot.voiceConnection);
        }
	}
};