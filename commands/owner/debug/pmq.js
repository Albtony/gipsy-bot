module.exports = {
	name: 'pmq',
	aliases: [],
	description: 'prints music queue',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
        if (bot.musicQueue.length == 0) {
            message.channel.send("mq is empty");
        }
        for (const elem of bot.musicQueue) {
            message.channel.send(`\`\`\`\n${JSON.stringify(elem)}\n\`\`\``);
        }
	}
};