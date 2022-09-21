const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'debug',
	description: 'for debugging stuff',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
		console.log(bot.musics.nowPlayingMsg);
	}
};