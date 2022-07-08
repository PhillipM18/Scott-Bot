module.exports.config = {
	name: "kick",
	version: "1.0.1", 
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
	commandCategory: "Nhóm", 
	usages: "[tag]", 
	cooldowns: 0,
};

module.exports.languages = {
	"vi": {
		"error": "Đ𝗮̃ 𝗰𝗼́ 𝗹𝗼̂̃𝗶 𝘅𝗮̉𝘆 𝗿𝗮, 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶 𝘀𝗮𝘂",
		"needPermssion": "𝗖𝗮̂̀𝗻 𝗾𝘂𝘆𝗲̂̀𝗻 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺\𝗻𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝗲̂𝗺 𝘃𝗮̀ 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶!",
		"missingTag": "𝗕𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝘁𝗮𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗮̂̀𝗻 𝗸𝗶𝗰𝗸"
	},
	"en": {
		"error": "Error! An error occurred. Please try again later!",
		"needPermssion": "Need group admin\nPlease add and try again!",
		"missingTag": "You need tag some person to kick"
	}
}

module.exports.run = async function({ api, event, getText, Threads }) {
	var mention = Object.keys(event.mentions);
	try {
		let dataThread = (await Threads.getData(event.threadID)).threadInfo;
		if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
		if(!mention[0]) return api.sendMessage("𝗕𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝘁𝗮𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗮̂̀𝗻 𝗸𝗶𝗰𝗸",event.threadID);
		if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
			for (const o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	} catch { return api.sendMessage(getText("error"),event.threadID) }
}