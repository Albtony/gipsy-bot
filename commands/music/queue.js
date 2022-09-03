const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	aliases: [ 'q' ],
	description: 'prints current music queue',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
		let description = '';
		let musics = bot.musics;
		let totalDuration = calcTotalDuration(musics.queue);
		let formattedDuration = formatTime(totalDuration);
		for (const music of musics.queue) {
			let entry = `⦁ [${music.title}](${music.url}) [${formatTime(music.duration)}]\n`;
			description += entry;
		}

		const queueEmbed = new MessageEmbed()
			.setColor('#2ee7b6')
			.setTitle('Music Queue')
			.setDescription(description)
			.setFooter({ text: `Total duration ${formattedDuration}   |   Loop: ${musics.loop}` });
		message.channel.send({ embeds: [queueEmbed] })
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

function calcTotalDuration(musicList) {
	let totSec = 0;
	for (const music of musicList) {
		totSec += music.duration - 1;
	}
	return totSec;
}