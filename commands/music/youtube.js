const ytdl = require('ytdl-core');
const { connectVoice, musicStart } = require('../../utils/playMusic');

module.exports = {
	name: 'youtube',
	aliases: [ 'yt' ],
	description: 'play music from youtube',
	ownerOnly: false,
	hidden: false,
        
	run: async (bot, message, args) => {        
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
		bot.musicQueue.push(music);

		if (!bot.voiceConnection) {
			await connectVoice(bot, message);
			musicStart(bot, message);
		}
	}
};