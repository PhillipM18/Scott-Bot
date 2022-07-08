module.exports.config = {
    name: "log",
    eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
    version: "1.0.0",
    credits: "Mirai Team",
    description: "Ghi lại thông báo các hoạt đông của bot!",
    envConfig: {
      enable: true
    }
  };
  
  module.exports.run = async function ({ api, event, Users, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    let botID = api.getCurrentUserID();
    /*var allThreadID = global.data.allThreadID;
    for (const singleThread of allThreadID) {
      const thread = global.data.threadData.get(singleThread) || {};
      if (typeof thread["log"] != "undefined" && thread["log"] == false) return;
    }*/
    
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY HH:mm:ss");
    //let nameThread = (await Threads.getData(event.threadID)).threadInfo.threadName || "Tên không tồn tại";
    //let nameThread = global.data.threadInfo.get(event.threadID).threadName || "Tên không tồn tại"; 
  
    //let threadInfo = await api.getThreadInfo(event.threadID);
    //nameThread =threadInfo.threadName;
    const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);
  
    //console.log(nameThread)
  
    var formReport = "[🐧] 𝗧𝗵𝗼̂𝗻𝗴 𝗯𝗮́𝗼 𝗧𝗵𝗲̂𝗺/𝗞𝗶𝗰𝗸 [🐧]" +
      "\n\n[🐧] 𝗕𝗼𝘅: " + nameThread +
      "\n\n[🐧] 𝗧𝗵𝗿𝗲𝗮𝗱 𝗜𝗗: " + event.threadID +
      "\n[🐧] 𝗛𝗮̀𝗻𝗵 đ𝗼̣̂𝗻𝗴: {task}" +
      "\n[🐧] 𝗧𝗲̂𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: " + nameUser +
      "\n[🐧] 𝗨𝘀𝗲𝗿𝗜𝗗: " + event.author +
      "\n\n[🐧] 𝗧𝗶𝗺𝗲: " + time + "",
      task = "";
    switch (event.logMessageType) {
      case "log:thread-name": {
          newName = event.logMessageData.name || "𝗧𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶";
          //task = "Người dùng thay đổi tên nhóm thành " + newName + "";
          await Threads.setData(event.threadID, {name: newName});
          break;
      }
      case "log:subscribe": {
        if (event.logMessageData.addedParticipants.some(i => i.userFbId == botID)) task = "[🐧] 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝘁𝗵𝗲̂𝗺 𝗯𝗼𝘁 𝘃𝗮̀𝗼 𝗺𝗼̣̂𝘁 𝗻𝗵𝗼́𝗺 𝗺𝗼̛́𝗶";
        break;
      }
      case "log:unsubscribe": {
        if (event.logMessageData.leftParticipantFbId == botID) {
          if(event.senderID == botID) return;
          const data = (await Threads.getData(event.threadID)).data || {};
          data.banned = true;
          var reason = "[🐧] 𝗞𝗶́𝗰𝗵 𝗯𝗼𝘁 𝘁𝘂̛̣ 𝗱𝗼, 𝗸𝗵𝗼̂𝗻𝗴 𝘅𝗶𝗻 𝗽𝗵𝗲́𝗽🚫";
          data.reason = reason || null;
          data.dateAdded = time;
          await Threads.setData(event.threadID, { data });
          global.data.threadBanned.set(event.threadID, { reason: data.reason, dateAdded: data.dateAdded });
  
          task = "[🐧] 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝗸𝗶𝗰𝗸 𝗯𝗼𝘁 𝗿𝗮 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺"
        }
        break;
      }
      default:
        break;
    }
  
    if (task.length == 0) return;
  
    formReport = formReport
      .replace(/\{task}/g, task);
  
    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
      if (error) return logger(formReport, "Logging Event");
    });
  }
