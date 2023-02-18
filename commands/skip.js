const { musicStart, musicSkip } = require("../utils/playMusic");

module.exports = {
	name: 'skip',
	description: 'sekip bradi',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
        try{
            musicSkip(bot, message);
            message.channel.send(`${message.author} ⏭ maen sundul sundul lagu org ae :V wkwkwkw`);
        }catch(err){
            console.log(err);
        }
    }
};