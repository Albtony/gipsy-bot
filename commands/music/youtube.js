const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'youtube',
	aliases: [ 'yt' ],
	description: 'play music from youtube',
	ownerOnly: false,
	hidden: false,
        
	run: async (bot, message, args) => {        
		let queue = bot.musicQueue.queue;
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
		queue.push(music);

		if (!bot.voiceConnection || bot.voiceConnection._state.status == "disconnected") {
			await connectVoice(bot, message);
			musicStart(bot, message);
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

async function musicStart(bot, message) {
	const player = createAudioPlayer();
	player
		.addListener('stateChange', async (oldState, newState) => {
			let queue = bot.musicQueue.queue;
			let pos = calcPosition(bot.musicQueue);
			const musicCount = queue.length;
			const loop = bot.musicQueue.loop;
			if (newState.status == 'idle') {
				queue = calcQueue(bot.musicQueue);
			} else if (newState.status == 'start'){
				// do nothing and out from the if statement
			} else {
				// do nothing and terminate
				return;
			}

			music = queue[pos];
			if (!music) {
				bot.voiceConnection.destroy();
				bot.voiceConnection = null;
				return;
			}

			message.channel.send({ embeds: [getPlayEmbed(music)]});
			player.play(getResource(music.url), { 
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
		
	bot.voiceConnection.subscribe(player);
	player.emit('stateChange', {status: undefined}, {status: 'start'});
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

function getPlayEmbed(music) {
	return new MessageEmbed()
		.setColor('#9fef00')
		.setTitle('Now Playing')
		.setDescription(`**[${music.title}](${music.url})**`)
		.setFooter({ text: `Song Duration ${formatTime(music.duration-1)}` });
}

function calcPosition(musicQueue) {
	const musicCount = musicQueue.queue.length;
	const loop = musicQueue.loop;

	if (loop) musicQueue.pos++;
	else musicQueue.pos = 0;

	if (musicQueue.pos >= musicCount) 
		musicQueue.pos = 0;

	return musicQueue.pos;
}

function calcQueue(musicQueue) {
	const loop = musicQueue.loop;
	const currMusic = musicQueue.queue.shift();

	if (loop) musicQueue.queue.push(currMusic);
	return musicQueue.queue;
}