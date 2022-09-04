module.exports = {
	name: 'skip',
	aliases: [ 's' ],
	description: 'skips music',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
        let musics = bot.musics;
        let skip = args[0];

        if (!skip) skip = 1;
        if (!isNumeric(skip) || skip > musics.queue.length || skip <= 0) {
            message.reply(`\`skip value is invalid\``);
            return;
        }
            
        if(skip == 1) message.channel.send(`\`skipping 1 song...\``);
        else message.channel.send(`\`skipping ${skip} songs...\``);
        musics.skip = parseInt(skip);
        musics.player.stop(true);
	}
};

function isNumeric(str){
    return /^\d+$/.test(str);
}