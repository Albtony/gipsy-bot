module.exports = {
	name: 'loop',
	aliases: [ 'l' ],
	description: 'loops the current music queue',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
        const musicCount = bot.musics.queue.length;
        if (bot.voiceConnection && bot.voiceConnection._state.status != "disconnected" && musicCount != 0) {
            if(bot.musics.loop == true) {
                bot.musics.loop = false;
                message.reply(`Music Loop : **Deactivated**`);
            } else {
                bot.musics.loop = true;
                message.reply(`Music Loop : **Activated**`);
            }
        } else {
            message.reply(`Bot is not playing any music right now`);
        }
	}
};