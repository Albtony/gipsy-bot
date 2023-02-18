const { MessageEmbed } = require("discord.js");

const apps = [
  "youtube",
  "poker",
  "betrayal",
  "fishing",
  "chess",
  "lettertile",
  "wordsnack", 
  "doodlecrew",
  "awkword",
  "spellcast",
  "checkers", 
  "puttparty",
  "sketchheads",
];

module.exports = {
	name: "activities",
	description: 'for fun activities',
	hidden: true,
	checkOwner: false,
	run(message, args) {
		console.log(message)
		console.log(message.member)
		const { channel } = message.member.voice;

		if (!channel){
			return message.reply("you need to be on a channel").catch(console.error);
		}

		if (args.length == 0){
			message.channel.send("activities need one argument `activities <activities name>` \n to check activities argument `activities list`")
		}
		else{

			if (args[0] == "list"){
				var list = apps.map((value)=> `- ${value}`).join("\n")
				const embed = new MessageEmbed()
					.setTitle("activities lists")
					.setColor("#F8AA2A")
					.setDescription(list)
				return message.channel.send(embed)
			}
			else{
				message.client.discordTogether
					.createTogetherCode(message.member.voice.channel.id, args[0])
					.then(async invite => {
						return message.channel.send(`${invite.code}`);
					});
			}
		}

		// message
		// .reply(i18n.__mf("activities.result", {authorID: message.author.id}))
		// .catch(console.error);
	}
};
// for 1 thing its 2 company trying to create some thing... the the other thing is bureaucracy