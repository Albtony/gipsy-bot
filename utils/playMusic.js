const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
} = require('@discordjs/voice');

function getResource(url){
	const stream = ytdl(url, {
		filter: "audioonly"
	});
	const resource = createAudioResource(stream);
	return resource
}


module.exports={

	connect:(bot, message)=>{
		bot.connection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

	},

	musicStart:async (bot, message)=>{
		const player = createAudioPlayer();
		bot.music_player = player;

		try {
			var music = bot.musicQueue[0]
			bot.musicQueue.shift(1);
			bot.current_music = music;
			await player.play(getResource(bot.current_music.url))

			player.on('error', error => {
				message.channel.send("sumtin went rong wit de pleye la :V dunno what ah")
				console.log(`${error.message}`);
			});

			player.addListener("stateChange", async (oldOne, newOne)=>{
				if (newOne.status == "idle") {
					message.channel.send("music finished")
					console.log("The song finished");
					console.log(newOne);
					
					var music = bot.musicQueue[0]
					bot.musicQueue.shift(1)
					if(!music){
						setTimeout(() => {
							if(!music){
								setTimeout(() => bot.subscription.unsubscribe(), 5_000);
								bot.connection.destroy();
							}
						}, 5_000);
						if (bot.subscription) {
							setTimeout(() => bot.subscription.unsubscribe(), 5_000);
							bot.connection.destroy();
						}
						return;
					}
					bot.current_music = music;
					await player.play(getResource(bot.current_music.url));
				}
			})

			bot.subscription = bot.connection.subscribe(player);

		} catch (error) {
				message.channel.send("sumtin went rong wen setartin de peleye laaa")
				console.log(error);
		}
	},
	musicSkip: async(bot, message)=>{
		const player = bot.music_player;
		try{
			var music = bot.musicQueue[0]
			bot.musicQueue.shift(1);
			bot.current_music = music;
			await player.play(getResource(bot.current_music.url));
		}catch(err){
			console.log(err);
		}
	},

	musicSkipTo: async(bot, message, index)=>{
		const player = bot.music_player;
		try{
			var music = bot.musicQueue[index-1]
			bot.musicQueue = bot.musicQueue.splice(index,(bot.musicQueue.length));
			bot.current_music = music;
			await player.play(getResource(bot.current_music.url));
		}catch(err){
			console.log(err);
		}
	}
}