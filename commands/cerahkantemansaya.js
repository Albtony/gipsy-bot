// @ts-check
const { Client, Message } = require("discord.js");
const alQuran = require('al-quran')

module.exports = {
	name: "lurus_kan_teman_hamba_ini_mengenai",
	cooldown: 0,
	description: "ceramah kiai haji gipsy",
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
		if(args.length == 0){
			return message.channel.send("brother you need 1 argument to use me... aish ck ck ck")
		}
		alQuran.pencarian( args.join(" "), 0, 100, "id")
			.then((res) => {
				var randomValue = Math.random()
				var selector = Math.floor(randomValue * (res.cari.id.data.length-1))
				var suratDanAyat = res.cari.id.data[selector]
                var replied_user = message.mentions.repliedUser;
				if(suratDanAyat){
					alQuran.tampilAyat(suratDanAyat.surat, suratDanAyat.ayat)
						.then( (resp2) =>{
							var datas = resp2.ayat.data
							var arb = datas.ar[0].teks
							var idr = datas.idt[0].teks
							var ind = datas.id[0].teks
                            if(replied_user){
                                message.channel.send(`woi <@!${replied_user.id}>, dengerin ni`)
                                message.channel.send("```"+arb+"```")
                                message.channel.send("```"+ind+"```")
                                return
                            }
                            // message.channel.send("bacot kau suuuu")
							message.channel.send("```"+arb+"```")
							// message.channel.send("```"+idr+"```")
							message.channel.send("```"+ind+"```")
							// console.log(arb)
							// console.log(idr)
							// console.log(ind)
						})

				}else{
					message.channel.send(`hmmm kyk nya di quran kgk ada dah tu yg ada arti ${args.join(" ")}`)
                    // message.channel.send("bacot kau suuuu")
				}
			})
	}
};