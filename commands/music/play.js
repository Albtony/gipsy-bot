const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'play',
	aliases: [ 'p' ],
	description: 'plays music from youtube',
	ownerOnly: false,
	hidden: false,
        
	run: async (bot, message, args) => {        
		let musics = bot.musics;
		if (!message.member.voice.channel) {
			message.reply('you\'re not in a voice channel you dumdum');
			return;
		}

		const videoInfo = (await ytdl.getBasicInfo(args[0])).videoDetails;
		const music = {
			title: videoInfo.title,
			duration: videoInfo.lengthSeconds,
			url: videoInfo.video_url
		};
		musics.queue.push(music);

		if (!bot.voiceConnection || bot.voiceConnection._state.status == "disconnected") {
			await connectVoice(bot, message);
			musicStart(bot, message, musics);
		}
	}
};

async function connectVoice(bot, message){
	bot.voiceConnection = joinVoiceChannel({
		channelId: message.member.voice.channel.id,
		guildId: message.guild.id,
		adapterCreator: message.guild.voiceAdapterCreator
	});
}

async function musicStart(bot, message, musics) {
	musics.player = createAudioPlayer();
	musics.player
		.addListener('stateChange', async (oldState, newState) => {
			musics.pos = calcPosition(bot.musics);
			if (newState.status == 'idle') {
				musics.queue = calcQueue(musics);
			} else if (newState.status == 'start'){
				// do nothing and out from the if statement
			} else {
				// do nothing and terminate
				return;
			}

			let music = musics.queue[musics.pos];
			if (!music) {
				bot.voiceConnection.destroy();
				bot.voiceConnection = null;
				return;
			}

			bot.commands.get('nowplaying').run(bot, message, '');
			musics.player.play(getResource(music.url), { 
				highWaterMark: 1024 * 1024 * 1,
				type: 'opus' 
			});
		})
		.on('error', (error) => {
			message.channel.send('something went wrong!');
			console.error(error);
			if(error.R) {
				console.log('haaa');
				console.error(error.R);
			}
			if(error.type) {
				console.log('heee');
				console.error(error.type);
			}
		});
		
	bot.voiceConnection.subscribe(musics.player);
	musics.player.emit('stateChange', {status: undefined}, {status: 'start'});
}

function getResource(music) {
	const stream = ytdl(music, {
		filter: 'audioonly'
	});
	const resource = createAudioResource(stream);
	return resource;
}

function formatTime(duration) {
	let hour = Math.trunc(duration / 3600);
	let min = Math.trunc(duration / 60);
	let sec = duration % 60;

	if(hour < 10) hour = `0${hour}`;
	if(min < 10) min = `0${min}`;
	if(sec < 10) sec = `0${sec}`;

	if(hour > 0) {
		return `${hour}:${min}:${sec}`;
	}
	
	return `${min}:${sec}`;
}

function calcPosition(musics) {
	if (musics.loop) musics.pos++;
	else musics.pos = 0;

	if (musics.pos >= musics.queue.length) 
		musics.pos = 0;

	return musics.pos;
}

function calcQueue(musics) {
	for (let i = 0; i < musics.skipCount; i++) {
		const currMusic = musics.queue.shift();
		if (musics.loop) musics.queue.push(currMusic);
	}

	musics.skip = 1;
	return musics.queue;
}