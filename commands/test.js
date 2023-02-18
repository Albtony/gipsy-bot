module.exports = {
	name: 'test',
	description: 'test',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
		console.log(message.mentions.repliedUser);
		// seems to work... LETS GOOOO
	}
};