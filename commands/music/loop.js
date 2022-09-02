module.exports = {
	name: 'loop',
	aliases: [ 'l' ],
	description: 'loops current music queue',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
        const musicCount = bot.musicQueue.queue.length;
        if (bot.voiceConnection && bot.voiceConnection._state.status != "disconnected" && musicCount != 0) {
            if(bot.musicQueue.loop == true) {
                bot.musicQueue.loop = false;
                message.reply(`Music Loop : **Deactivated**`);
            } else {
                bot.musicQueue.loop = true;
                message.reply(`Music Loop : **Activated**`);
            }
        } else {
            message.reply(`Bot is not playing any music right now`);
        }
	}
};