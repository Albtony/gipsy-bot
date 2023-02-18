module.exports = {
	name: 'bro_lu_di_panggil',
	description: 'replies with "pong!"',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
        console.log(message);
        replied_user = message.mentions.repliedUser;
		message.channel.send('yooo! <@!'+replied_user.id+'>');
	}
};