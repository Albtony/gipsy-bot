module.exports={
	convertMiliSecToDate:(mili)=>{
		var lookup = [365,24,60,60,1000]
		var humanReadable = ["days", "hour", "minute", "second", "ms"]
		return [86400000, 3600000, 60000, 1000, 1].map((value,index)=>{
			return String(~~(mili/value)%lookup[index])+humanReadable[index]+","
		}).join(" ")
	},
	convertSecToDate:(sec)=>{
		var lookup = [365,24,60,60]
		var humanReadable = ["days", "hour", "minute", "second"]
		return [86400, 3600, 60, 1].map((value,index)=>{
			return String(~~(sec/value)%lookup[index])+humanReadable[index]+","
		}).join(" ")
	}
}