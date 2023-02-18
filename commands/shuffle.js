module.exports = {
	name: 'shuffle',
	description: 'shuffle the queue',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
        try{
            message.channel.send("shuffling the queue");
            var music_queue = bot.musicQueue;
            var new_queue = [];
            for(var i = 0; i < music_queue.length; i++){
                var random_index = Math.floor(Math.random() * music_queue.length);
                new_queue.push(music_queue[random_index]);
            }
            bot.musicQueue = new_queue;
        }
        catch(err){
            console.log(err);
        }
	}
};