module.exports = {
	name: 'voiceStateUpdate',
	execute: (bot) => {
        let voiceStatus = bot.voiceConnection._state.status;
		if(voiceStatus == "disconnected" || voiceStatus == null) {
            bot.musicQueue = [];
        }
	}
};