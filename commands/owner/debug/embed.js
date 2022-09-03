const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'embed',
    aliases: [],
    description: 'print embed',
    ownerOnly: true,
    hidden: true,
    
    run: (bot, message, args) => {
        let embedMsg = new MessageEmbed()
            .setColor('#2ee7b6')
            .setTitle('Music Queue')
            .setDescription(`
                ⦁ heho [dur]
                ⦁ hihi [dur]
                ⦁ huhu [dur]
            `)
            .setFooter({ text: 'Total duration : [tdur]' });
        message.channel.send({ embeds: [embedMsg] })
    }
};