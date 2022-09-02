const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'nowplaying',
	aliases: [ 'np' ],
	description: 'prints current music playing',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
		message.channel.send({ embeds: [generatePlayEmbed(music)] });
	}
};

function generatePlayEmbed(music) {
	return new MessageEmbed()
		.setColor('#9fef00')
		.setTitle('Now Playing')
		.setDescription(`**[${music.title}](${music.url})**`)
		.setFooter({ text: `Song Duration ${formatTime(music.duration)}` });
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