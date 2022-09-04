module.exports = {
	name: 'pick',
	description: 'randomly picks an element from a given list',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
		const nItem = args.length;

		if (nItem == 0){
			message.channel.send('There\'s no item you dumdum');
			return;
		}

		const radInt = Math.floor(Math.random() * nItem);
		message.channel.send(args[radInt]);
	}
};