const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async(bot, message, args) => {
let userbub = message.mentions.members.first();

let userbubbles = await db.fetch(`bubbles_${message.author.id}`)

if(!userbub){
    let userbubembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .setColor("#77c9ff")
    .addField("You have popped", `${userbubbles} bubbles`)

    message.channel.send(userbubembed)

} else {

    let memberbubbles = await db.fetch(`bubbles_${userbub.id}`)

    let membubebed = new Discord.RichEmbed()
    .setAuthor(userbub.displayName)
    .setThumbnail(userbub.user.avatarURL)
    .setColor("#77c9ff")
    .addField(`has popped`, `${memberbubbles} bubbles`)

    message.channel.send(membubebed)
}
}

exports.config = {
    aliases: [ 'bubs' ]
};

exports.help = {
    name: 'bubbles'
}
