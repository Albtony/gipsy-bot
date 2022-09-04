module.exports = {
	name: 'debug',
	aliases: [],
	description: 'for debugging stuff',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
        console.log(bot.musics);
	}
};