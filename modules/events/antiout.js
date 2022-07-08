module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "0.0.1",
    credits: "DungUwU",
    description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (!data.antiout) return;
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đuổi";
    if (type == "tự rời") {
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
            if (error) {
                api.sendMessage(`[🐧] 𝐀𝐍𝐓𝐈𝐎𝐔𝐓 \n[🐧] 𝐊𝐡𝐨̂𝐧𝐠 𝐦𝐨̛̀𝐢 𝐥𝐚̣𝐢 đ𝐮̛𝐨̛̣𝐜 đ𝐮̛́𝐚 𝐭𝐡𝐢́𝐜𝐡 𝐨𝐮𝐭 𝐜𝐡𝐮̀𝐚 ${name} 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦 :( `, event.threadID)
            } else api.sendMessage(`[🐧] 𝐀𝐍𝐓𝐈𝐎𝐔𝐓 \n[🐧] Đ𝐚̃ 𝐦𝐨̛̀𝐢 𝐥𝐚̣𝐢  ${name} 𝐥𝐚̀ đ𝐮̛́𝐚 𝐭𝐡𝐢́𝐜𝐡 𝐨𝐮𝐭 𝐜𝐡𝐮̀𝐚. 𝐂𝐡𝐮𝐚̂̉𝐧 𝐛𝐢̣ 𝐭𝐢𝐧𝐡 𝐭𝐡𝐚̂̀𝐧 đ𝐢`, event.threadID);
        })
    }
}
