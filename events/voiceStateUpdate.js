module.exports = {
	name: 'voiceStateUpdate',
	execute: (bot) => {
		if(!bot.voiceConnection || bot.voiceConnection._state.status == "disconnected") {
            bot.musicQueue = [];
        }
	}
};