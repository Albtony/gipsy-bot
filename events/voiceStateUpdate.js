module.exports = {
	name: 'voiceStateUpdate',
	execute: (bot) => {
		if(!bot.voiceConnection || bot.voiceConnection._state.status == "disconnected") {
			console.log('vsu');
            bot.musics.queue = [];
			bot.musics.loop = false;
			bot.musics.pos = 0;
        }
	}
};