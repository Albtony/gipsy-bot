const { Client, Message, MessageEmbed } = require("discord.js");
const { convertSecToDate } = require("../utils/timeHandler.js")


module.exports = {
	name: 'queue',
	description: 'print the queue',
	hidden: false,
	checkOwner: false,
	run: async (bot, message, args) => {
        // const permissions = message.channel.permissionsFor(message.client.user);
        // console.log(permissions, permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))

        // if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
        //     return message.reply("Missing permission to manage messages or add reactions");

        try {
            const queue = bot.musicQueue
            // console.log(queue)
    
            bot.currentPage = 0;
            const embeds = generateQueueEmbed(bot, message, queue);

            const queueEmbed = await message.channel.send({
                content: `**Current Page: ${bot.currentPage + 1}/${embeds.length}**`,
                embeds: [embeds[bot.currentPage]]
            });

            // console.log(embeds);
    
            try {
                await queueEmbed.react("⬅️");
                await queueEmbed.react("⏹");
                await queueEmbed.react("➡️");
              } catch (error) {
                console.error(error);
                message.channel.send(error.message).catch(console.error);
              }
    
            const filter = (reaction, user) =>["⬅️", "⏹", "➡️"]
                .includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
    
            collector.on("collect", async (reaction, user) => {
                try {
                    if (reaction.emoji.name === "➡️") {
                        if (bot.currentPage < embeds.length - 1) {
                            bot.currentPage++;
                            queueEmbed.edit({
                                content: `**Current Page: ${bot.currentPage + 1}/${embeds.length}**`,
                                embeds: [embeds[bot.currentPage]]
                            });
                        }
                    } else if (reaction.emoji.name === "⬅️") {
                        if (bot.currentPage !== 0) {
                            --bot.currentPage;
                            queueEmbed.edit({
                                content: `**Current Page: ${bot.currentPage + 1}/${embeds.length}**`,
                                embeds: [embeds[bot.currentPage]]
                            });
                        }
                    } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                } catch (error) {
                    console.error(error);
                    return message.channel.send(error.message).catch(console.error);
                }
              });
        } catch (error) {
            console.log("there was an error!!!\n",error)
        }
	}
}

function generateQueueEmbed(bot, message, queue) {
    let embeds = [];
    let k = 10;
    let totalDuration = 0;
    
    console.log(bot.current_music);
    
    for (let x of queue){
          if(parseInt(x.duration) != NaN){
              totalDuration += parseInt(x.duration);
          }
    }
  
  
    for (let i = 0; i < queue.length; i += 10) {
      const current = queue.slice(i, k);
      let j = i;
      k += 10;
  
      const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
  
      const embed = new MessageEmbed()
        .setTitle("Music Queue")
        .setThumbnail(message.guild.iconURL())
        .setColor("#2A9FF8")
        .setDescription(
            `**Current Song - [${bot.current_music.title}](${bot.current_music.url})**\n\n${info}\ntotal music: **${queue.length}**\ntotal duration: **${convertSecToDate(totalDuration)}**`
        )
        .setTimestamp();
      embeds.push(embed);
    }
    return embeds;
  }