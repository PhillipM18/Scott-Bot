module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "NTKhang update & fix by DuyVuong and D-jukie & chỉnh font chữ by tnhan",
  //Chỉnh font chữ không phải là khó, nhưng cần sự kiên trì nên hãy tôn trọng công sức của tôi bỏ ra=))
  description: "Thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "Nhóm",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
  try {
    var name = (await Users.getData(event.senderID)).name;
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.attachments.length != 0) {
      for (var p of event.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    };
    switch (handleReply.type) {
      case "reply": {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({
              body: "📄𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ " + name + ":\n" + (event.body) || "𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶", mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            }));
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: "📄𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ " + name + ":\n" + (event.body) || "𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗲̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶" + "\n----------------\n𝗞𝗲̀𝗺 𝘁𝗵𝗲𝗼 𝘁𝗲̣̂𝗽!", attachment: l, mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            }));
            for (var b of s) {
              fs.unlinkSync(b);
            }
          }
        }
        break;
      }
      case "calladmin": {
        if (s.length == 0) {
          api.sendMessage({ body: `[🐧] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻 ${name} đ𝗲̂́𝗻 𝗯𝗮̣𝗻:\n--------\n${(event.body) || "𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶"}\n--------\n[💬] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝗴𝘂̛̉𝗶 𝗯𝗮́𝗼 𝗰𝗮́𝗼 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
        }
        else {
          api.sendMessage({ body: `[🐧] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻 ${name} đ𝗲̂́𝗻 𝗯𝗮̣𝗻:\n--------\n${(event.body) || "𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗲̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶"}\n--------\n[💬] 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 đ𝗲̂̉ 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝗴𝘂̛̉𝗶 𝗯𝗮́𝗼 𝗰𝗮́𝗼 𝘃𝗲̂̀ 𝗮𝗱𝗺𝗶𝗻\n--------\n[🐧] 𝗧𝗲̣̂𝗽 𝗮𝗱𝗺𝗶𝗻 𝗴𝘂̛̉𝗶 đ𝗲̂́𝗻 𝗯𝗮̣𝗻!`, attachment: l, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
        break;
      }
    }
  }
  catch (ex) {
    console.log(ex);
  }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
  try {
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.messageReply) {
    if (event.messageReply.attachments.length != 0) {
      for (var p of event.messageReply.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    }
  }
    if (!args[0] && event.messageReply.attachments.length == 0)
      return api.sendMessage(
        "[🐧] 𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗻𝗵𝗮̣̂𝗽 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗰𝗮̂̀𝗻 𝗯𝗮́𝗼 𝗰𝗮́𝗼",
        event.threadID,
        event.messageID
      );

    var name = (await Users.getData(event.senderID)).name;
    var idbox = event.threadID;

    var datathread = (await Threads.getData(event.threadID)).threadInfo;
    var namethread = datathread.threadName;

    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    var soad = global.config.ADMINBOT.length;
    api.sendMessage(
      "[🐧] 𝗦𝘂𝗰𝗰𝗲𝘀𝘀\n[🐧] Đ𝗮̃ 𝗴𝘂̛̉𝗶 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝘁𝗼̛́𝗶 " + soad + " 𝗔𝗱𝗺𝗶𝗻 𝗯𝗼𝘁...",
      event.threadID,
      () => {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({ body: `[🐧]  𝗕𝗮́𝗼 𝗰𝗮́𝗼 𝘁𝘂̛̀: ${name}\n[🐧] 
            𝗕𝗼𝘅: ${namethread}\n[🐧] 𝗜𝗗 𝗯𝗼𝘅: ${idbox}\n----------------\n[⚠️] 𝗟𝗼̂̃𝗶: ${args.join(
              " "
            )}\n----------------\n𝗧𝗶𝗺𝗲: ${gio}`, mentions: [{ id: event.senderID, tag: name }] },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: `[🐧] 𝗕𝗮́𝗼 𝗰𝗮́𝗼 𝘁𝘂̛̀: ${name}\n⚡𝗕𝗼𝘅: ${namethread}\n[🐧] 𝗜𝗗 𝗯𝗼𝘅: ${idbox}\n----------------\n[⚠️] 𝗟𝗼̂̃𝗶: ${(args.join(
                " "
              )) || "𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗲̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 𝗯𝗮́𝗼 𝗰𝗮́𝗼!"}\n----------------\n[🐧] 𝗧𝗶𝗺𝗲: ${gio}\n----------------\n[🐧] 𝗞𝗲̀𝗺 𝘁𝗵𝗲𝗼 𝘁𝗲̣̂𝗽!`, attachment: l, mentions: [{ id: event.senderID, tag: name }]
            },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
      }
      , event.messageID);
  }
  catch (ex) {
    console.log(ex);
  }
};