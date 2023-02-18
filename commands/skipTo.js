const { musicStart, musicSkipTo } = require("../utils/playMusic");

module.exports = {
	name: 'skipto',
	description: 'sekip ke angka n beradibradi',
	hidden: false,
	checkOwner: false,
	run: async (bot, message, args) => {
        try{
            if (args.length == 0) {
                message.channel.send("please provide a number to skip to");
                return;
            }else if (args.length > 1) {
                message.channel.send("please provide only 1 number to skip to");
                return;
            }else{
                var skipTo = parseInt(args[0]);
                if (isNaN(skipTo)) {
                    message.channel.send("please provide a valid number to skip to");
                    return;
                }else if (skipTo < 1) {
                    message.channel.send("please provide a number greater than 0");
                    return;
                }else if (skipTo > bot.musicQueue.length) {
                    message.channel.send("please provide a number less than the queue length");
                    return;
                }
            }

            // const player = bot.music_player;

            // console.log();
            // var music = bot.musicQueue[index-1]

            // bot.musicQueue.splice(skipTo,(bot.musicQueue.length))

            // console.log("menarique")

            // console.log(skipTo)
            // console.log(tempQueue.length)
            // console.log(tempQueue..length)
            // console.log(tempQueue.length)
            
            
            // bot.musicQueue = bot.musicQueue.splice(index,(data.length));
            // bot.current_music = music;
            // await player.play(getResource(bot.current_music.url));

            musicSkipTo(bot, message, skipTo);
            message.channel.send(`${message.author} ⏭ buset maen sundul sundul lagu org nye jauh :V`);
        }catch(err){
            console.log(err);
        }
    }
};