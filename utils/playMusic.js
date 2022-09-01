const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');

// only support youtube for now

module.exports={
	connectVoice: async (bot, message) => {
		bot.voiceConnection = await joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator
		});
	},

	musicStart: async (bot, message) => {
		const player = createAudioPlayer();

		try {
			// bisa refactor jadi shift() kalo queue.js ga butuh kaya gini.
			let music = bot.musicQueue[0];
			await player.play(getResource(music.url));

			player
				.on('error', (error) => {
					message.channel.send('something went wrong!');
					console.log('error1: ');
					console.error(error);
				})
				.addListener('stateChange', async (oldOne, newOne) => {
					if (newOne.status == 'idle') {
						message.channel.send('music finished');
						bot.musicQueue.shift();
						music = bot.musicQueue[0];
						if (!music) {
							message.channel.send('queue finished');
							bot.voiceConnection.destroy();
							bot.voiceConnection = null;
							return;
						}
						player.play(getResource(music.url));
					}
				});
				
			bot.voiceConnection.subscribe(player);

		} catch (error) {
			message.channel.send('something went wrong!');
			console.log('error2: ');
			console.error(error);
		}
	}
};

function getResource(music){
	const stream = ytdl(music, {
		filter: 'audioonly'
	});
	const resource = createAudioResource(stream);
	return resource;
}


/**
 * TO DO :
 * empty queue when bot disconnect -> once?
 */