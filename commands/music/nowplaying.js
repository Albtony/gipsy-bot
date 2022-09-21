const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'nowplaying',
	aliases: [ 'np' ],
	description: 'prints the current music playing',
	ownerOnly: false,
	hidden: false,
	
	run: async (bot, message, args) => {
		let music = bot.musics.queue[0];
		let playEmbed = new MessageEmbed()
			.setColor('#9fef00')
			.setTitle('Now Playing')
			.setDescription(`**[${music.title}](${music.url})**`)
			.setFooter({ text: `Song Duration ${formatTime(music.duration-1)}` });
		
		bot.musics.nowPlayingMsg = await message.channel.send({ embeds: [playEmbed] });
	}
};

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