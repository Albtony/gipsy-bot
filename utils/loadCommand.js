const { readdirSync, readFileSync } = require('node:fs');
const { convertSecToDate } = require("./timeHandler")

function getTotalLength(json){
	var totalLength = 0;
	json.forEach((value)=>{totalLength+=value.duration})
	return totalLength;
}

module.exports={
	hotLoadCommands:(bot)=>{
		const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			delete require.cache[require.resolve(`../commands/${file}`)];
			const command = require(`../commands/${file}`);
			bot.commands.set(command.name, command);
		}
	},
	hotLoadEvent:(bot)=>{
		const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
		for (const file of eventFiles) {
			const event = require(`../events/${file}`);
			if (event.once) {
				bot.once(event.name, (ret)=>event.execute(bot, ret) );
			} else {
				bot.on(event.name, (ret)=>event.execute(bot, ret) );
			}
		}
	},
	hotLoadSlashCommand:(bot)=>{
		const slashCommandFiles = readdirSync('./slashCommand').filter(file => file.endsWith('.js'));
		bot.tempSlashCommand = []
		for (const file of slashCommandFiles) {
			delete require.cache[require.resolve(`../slashCommand/${file}`)];
			const slashCommand = require(`../slashCommand/${file}`);

			bot.slashCommands.set(slashCommand.name, slashCommand)
			
			bot.tempSlashCommand.push(slashCommand);
		}
	},
	hotLoadImageDatabase:(bot)=>{
		const imgLinkFiles = readdirSync('./links').filter(file => file.endsWith('.js'));
		for (const file of imgLinkFiles) {
			delete require.cache[require.resolve(`../links/${file}`)];
			const img = require(`../links/${file}`);
			bot.imgDb.set(img.name, img)
		}
	},
	hotLoadPlaylist:(bot)=>{
		const playlistList = readdirSync('./playlist').filter(file => file.endsWith('.json'));
		for( const file of playlistList ){
			var tempPlaylist = {
				name:`${file.replace("\.json","")}`,
				duration: "",
				playlist: JSON.parse(readFileSync(`./playlist/${file}`))
			}
			tempPlaylist.playlist = tempPlaylist.playlist.map((value)=>{
				return {
					title: value.title,
					url: value.url,
					duration: value.len
				}
			})


			tempPlaylist.duration = convertSecToDate(getTotalLength(tempPlaylist.playlist))
			bot.localPlaylist.set(tempPlaylist.name, tempPlaylist)
		}
	}
}