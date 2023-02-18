// @ts-check
const { Client, Message } = require("discord.js");
const {readFileSync} = require("fs");



module.exports = {
	name: 'sysinfo',
	description: 'for printing system info',
	hidden: false,
	checkOwner: true,
	/**
	 *
	 * @param {Client} bot
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: (bot, message, args) => {
		let OUTPUT = "null (you have not created file for this command)";
		try{
			let buffer = readFileSync("../preexistingOutput/sysinfoOutput");
			OUTPUT = buffer.toString();
		}
		catch(err){
			console.log("it doesnt exists")
		}
		// return sendAttachedEphemeral(message, "./preexistingOutput/test.txt")
		return message.channel.send({content: "```\n"+OUTPUT+"\n```"})
	}
};