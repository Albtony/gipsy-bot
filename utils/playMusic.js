const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');

// only support youtube for now

module.exports={
	connectVoice: async (bot, message) => {
		bot.voiceConnection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator
		});
	},

	musicStart: async (bot, message) => {
		const player = createAudioPlayer();
		player
			.addListener('stateChange', async (oldState, newState) => {
				if (newState.status == 'idle' || newState.status == 'start') {
					if (newState.status == 'idle') {
						message.channel.send('music finished');
					}
					
					music = bot.musicQueue[0];
					bot.musicQueue.shift();
					if (!music) {
						bot.voiceConnection.destroy();
						bot.voiceConnection = null;
						return;
					}

					player.play(getResource(music.url));
				}
			})
			.on('error', (error) => {
				message.channel.send('something went wrong!');
				console.error(error);
			});
			
		bot.voiceConnection.subscribe(player);
		player.emit('stateChange', {status: undefined}, {status: 'start'});
	}
};

function getResource(music){
	const stream = ytdl(music, {
		filter: 'audioonly'
	});
	const resource = createAudioResource(stream);
	return resource;
}