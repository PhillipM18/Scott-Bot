  module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.3",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event, Users }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`『 ${global.config.PREFIX} 』 • ${(!global.config.BOTNAME) ? "Bot của tnhan <3" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`➤ 𝗞𝗲̂́𝘁 𝗻𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n→ 𝗦𝘂̛̉ 𝗱𝘂̣𝗻𝗴 !𝗵𝗲𝗹𝗽 𝗵𝗼𝗮̣̆𝗰 !𝗺𝗲𝗻𝘂 đ𝗲̂̉ 𝗯𝗶𝗲̂́𝘁 𝘁𝗵𝗲̂𝗺 𝗰𝗮́𝗰 𝗹𝗲̣̂𝗻𝗵`, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `join.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);

				if (!global.data.allUserID.includes(id)) {
					await Users.createData(id, { name: userName, data: {} });
					global.data.allUserID.push(id);
					logger(global.getText("handleCreateDatabase", "newUser", id), "DATABASE");
				}
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "🦋𝗛𝗶 {type} {name}.\n𝗖𝗵𝗮̀𝗼 𝗺𝘂̛̀𝗻𝗴 {type} đ𝗮̃ đ𝗲̂́𝗻 𝘃𝗼̛́𝗶 {threadName}.\n🍁𝗧𝘂̛̀ 𝗻𝗮𝘆 {name} 𝘀𝗲̃ 𝗹𝗮̀ 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝘁𝗵𝘂̛́ {soThanhVien} 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺 {threadName}\n" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  '𝗰𝗮́𝗰 𝗰𝗮̣̂𝘂' : '𝗰𝗮̣̂𝘂')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}
