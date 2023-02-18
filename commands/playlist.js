const { Client, Message, MessageEmbed } = require("discord.js");
const { readdirSync, readFileSync } = require('node:fs');
const { musicStart, connect } = require('../utils/playMusic')


var listUsage=[
	"usage: [prefix] playlist list",
	"	to show custom/curatedlist",
].join("\n")

var localUsage=[
	"usage: [prefix] playlist local <playlistName>",
	"	to load in local playlist",
].join("\n")

var urlUsage=[
	"usage: [prefix] playlist <URL|SONG>",
	"	to find the youtube playlist",
	"	**note: have not been implemented**",
].join("\n")

var argumentError = [
	listUsage,
	"",
	localUsage,
	"",
	urlUsage,
].join("\n")

var noArgumentError = [
	"need atleast 1 argument",
	argumentError,
].join("\n")


module.exports = {
	name: 'playlist',
	description: 'add playlist to the queue',
	hidden: false,
	checkOwner: false,

	/**
	 * @param {Client} bot
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: (bot, message, args) => {
		if(!args[0]){return message.channel.send(noArgumentError)}

		var anyUrlRegex = /^(https?:\/\/)/gi;

		const playlistList = Array.from(bot.localPlaylist.values())

		if(args[0] == "list"){

			var playlistListEmbed = new MessageEmbed()
				.setTitle("curated playlist")
				.setDescription("list all the available local playlist")
				.setColor("#F8AA2A");
			
			playlistList.forEach((playlist)=>{

				playlistListEmbed.addField(
					`${playlist.name}`,
					`${playlist.duration}`,
					true
				)
			})
			message.channel.send({embeds: [playlistListEmbed] })
		}
		else if(args[0] == "local"){
			if(!args[1])return message.channel.send(argumentError)
			var tempPlaylist=bot.localPlaylist.get(args[1])
			
			if(!tempPlaylist)return message.channel.send(`i dont think we have ${args[1]} playlist sir...`)
			bot.musicQueue.push(...tempPlaylist.playlist)
			if(!bot.connection){
				connect(bot,message)
				musicStart(bot, message)
			}
			return message.channel.send("musicLoaded")
		}
		else if(anyUrlRegex.test(args[0])){
			return message.reply("... YOU DENSE FUCK... I TOLD YOU WE HAVE NOT IMPLEMENT IT !!!")
		}
		else{
			return message.channel.send(argumentError)
		}
	}
	
};