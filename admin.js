const TelegramApi = require("node-telegram-bot-api");
require('dotenv').config()
const { read_file, write_file } = require("./fs/fs_api");

const api = process.env.TOKEN;
const bot = new TelegramApi(api, { polling: true })

function opt(alt) {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: "👍",
                    callback_data: "👍"
                },
                {
                    text: "👎",
                    callback_data: "👎"
                }]
            ],
            caption: alt
        })
    }
}

bot.on("callback_query", async msg => {
    require('../bot/modul/dislikes.json')

    let chatId = msg.message.chat.id
    let Id = msg.message.message_id
    // if (msg.data == "👍") {
    //     console.log(likes.length == 0 || likes[likes.length - 1], copy[0]);
    //     if (likes[likes.length - 1] != copy[0] || likes.length == 0) {
    //         likes.push(copy[0])
    //         write_file("likes.json", likes);
    //     }
    //     bot.deleteMessage(chatId, Id, options)
    // }
    // else if (msg.data == "👎") {
    //     console.log(dislikes.length == 0 || dislikes[dislikes.length - 1], copy[0]);
    //     if (dislikes[dislikes.length - 1] != copy[0] || dislikes.length == 0) {
    //         dislikes.push(copy[0])
    //         write_file("dislikes.json", dislikes);
    //     }
    //     bot.deleteMessage(chatId, Id, options)
    // }
})

bot.on("message", async msg => {
    require('../bot/modul/dislikes.json')

    let dislikes = read_file("dislikes.json")
    let chatId = msg.chat.id;
    id = msg.message_id;
    let user;
    if (dislikes.length == 0) {
        write_file('dislikes.json', [[chatId, 1]])
    } else {
        for (let i in dislikes) {
            if (dislikes[i][0] == chatId) {
                user = i;
            } else {
                dislikes.push([chatId])
                write_file('dislikes.json', dislikes)
            }
        }
    }
    try {
        let text = msg.text;
        if (text == "/start") {
            bot.sendMessage(chatId, `Assalomu alaykum bu bot orqali siz t.me/upworkstart guruhiga qo'shilishingiz va upworkda ish olishingizni osonlashritishingiz mumkin.\nBuning uchun siz quyidagilarni kiriting:
            Ism: John
            Familiya: Doe
            Telefon: +998 99 999 99 99
            Email: example@gmail.com
            Sohasi: Web developer
            Tajribasi: 1 yil
            `)
        } else {
            dislikes[user][1] = 2
            dislikes[user].push(text)
            write_file("dislikes.json", dislikes)
        }
    } catch (error) {
        console.log('error=> ' + error);
    }
})