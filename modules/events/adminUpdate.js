module.exports.config = {
    name: "adminUpdate",
    eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-color"],
    version: "1.0.1",
    credits: "Mirai Team",
    description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads,Users }) {
    const fs = require("fs");
    var iconPath = __dirname + "/emoji.json";
    if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;

    const thread = global.data.threadData.get(threadID) || {};
    if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                 if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🐧] → Đ𝗮̃ 𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${logMessageData.TARGET_ID} 𝘁𝗿𝗼̛̉ 𝘁𝗵𝗮̀𝗻𝗵 𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🐧] → Đ𝗮̃ 𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${logMessageData.TARGET_ID} 𝘁𝗿𝗼̛̉ 𝘁𝗵𝗮̀𝗻𝗵 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻`, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:user-nickname": {
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) return;
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🐧] → Đ𝗮̃ 𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝗯𝗶𝗲̣̂𝘁 𝗱𝗮𝗻𝗵 𝗰𝘂̉𝗮 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${logMessageData.participant_id} 𝘁𝗵𝗮̀𝗻𝗵: ${(logMessageData.nickname.length == 0) ? "𝘁𝗲̂𝗻 𝗴𝗼̂́𝗰": logMessageData.nickname}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || "Không tên";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🐧] → Đ𝗮̃ 𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝘁𝗲̂𝗻 𝗻𝗵𝗼́𝗺 𝘁𝗵𝗮̀𝗻𝗵: ${dataThread.threadName}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-icon": {
                let preIcon = JSON.parse(fs.readFileSync(iconPath));
                dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🐧] → ${event.logMessageBody.replace("𝗯𝗶𝗲̂̉𝘂 𝘁𝘂̛𝗼̛̣𝗻𝗴 𝗰𝗮̉𝗺 𝘅𝘂́𝗰", "𝗶𝗰𝗼𝗻")}\n=> 𝗜𝗰𝗼𝗻 𝗴𝗼̂́𝗰: ${preIcon[threadID] || "𝗸𝗵𝗼̂𝗻𝗴 𝗿𝗼̃"}`, threadID, async (error, info) => {
                    preIcon[threadID] = dataThread.threadIcon;
                    fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
             case "log:thread-color": {
                dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[🐧] → ${event.logMessageBody.replace("𝗰𝗵𝘂̉ đ𝗲̂̀", "𝗰𝗼𝗹𝗼𝗿")}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}
