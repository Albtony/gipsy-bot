module.exports = {
	name: 'shuffle',
	aliases: [ 'sf' ],
	description: 'shuffles queue',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
        let musics = bot.musics;
        musics.queue = shuffle(musics.queue);
        message.channel.send(`\`shuffling succesful:\``);
        bot.commands.get('queue').run(bot, message, '');
	}
};

function shuffle(queue) {
    let currentMusic = queue.shift();
    let currentIndex = queue.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [queue[currentIndex], queue[randomIndex]] = [queue[randomIndex], queue[currentIndex]];
    }
  
    queue.unshift(currentMusic);
    return queue;
}