const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'debug',
	description: 'for debugging stuff',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
		let commands = bot.commands;
		let prefix = bot.config.PREFIX;
        let helpEmbed = new MessageEmbed()
			.setColor('#0086ff')
			.setTitle('Help');

		commands.forEach((command) => {
			if(!command.hidden && !command.ownerOnly) {
				helpEmbed.addField(
					`**${prefix}${command.name} ${command.aliases ? `(${command.aliases})` : ""}**`,
					`${command.description}`,
					  true
				);
			}
		});

		message.channel.send({ embeds: [helpEmbed] });
	}
};