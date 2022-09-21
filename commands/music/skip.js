module.exports = {
	name: 'skip',
	aliases: [ 's' ],
	description: 'skips music',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
        let musics = bot.musics;
        let skipCount = args[0];

        if (!skipCount) skipCount = 1;
        if (!isNumeric(skipCount) || skipCount > musics.queue.length || skipCount <= 0) {
            message.reply(`\`skip value is invalid\``);
            return;
        }
            
        if(skipCount == 1) message.channel.send(`\`skipping 1 song...\``);
        else message.channel.send(`\`skipping ${skipCount} songs...\``);
        musics.skip = parseInt(skipCount);
        musics.player.stop(true);
	}
};

function isNumeric(str){
    return /^\d+$/.test(str);
}