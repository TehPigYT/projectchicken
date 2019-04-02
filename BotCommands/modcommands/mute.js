const Discord = require('discord.js')

exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you cant use this command because you do not have the manage messages permission");
  
    let Mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    
    let errorEmbed = new Discord.RichEmbed()
    .setTitle('Incorect Command Usage')
    .setColor('MAGENTA')
    .addField('Command usage', ';mute <member name / mention>')
    .addField('Server mute usage', ';mute server <member name / mention>')
    
    if(!Mute) return message.reply(errorEmbed)
    let mreason = args.join(" ").slice(22);
    if(Mute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");

    let arg = message.content.toLowerCase()    

    if(arg === `;mute server ${Mute}`) {
        message.guild.channels.forEach(channel=> {
            channel.replacePermissionOverwrites({ 
                overwrites: [ 
                    {
                        id: `${Mute.id}`, 
                        denied: ['SEND_MESSAGES']
                    }
                ]
            })
         })
    }else{
        message.channel.replacePermissionOverwrites({ 
            overwrites: [ 
                {
                    id: `${Mute.id}`, 
                    denied: ['SEND_MESSAGES']
                }
            ]
        });
    }
    
    let mutechan = message.guild.channels.find(b => b.name === "modlogs");
    if(!mutechan) return message.channel.send("Could not find modlogs channel");
    if(!mreason){

    let muteembed2 = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor('PURPLE')
    .setThumbnail(Mute.user.avatarURL)
    .setTimestamp(message.createdAt)
    .setDescription(`<@${Mute.id}> has been muted`)
    .addField("There was no reason given", "test")

    message.delete().catch(O_o=>{});
    mutechan.send(muteembed2);

  }else{
    let muteembed = new Discord.RichEmbed()
    .setAuthor(`<@${message.author.username}>`)
    .setColor('PURPLE')
    .setThumbnail(Mute.user.avatarURL)
    .setTimestamp(message.createdAt)
    .setDescription(`<@${Mute.id}> has been muted`)
    .addField("Reason", mreason)

    message.delete().catch(O_o=>{});
    mutechan.send(muteembed);
    return;
  }
}

exports.config = {
  aliases: [  ]
};

exports.help = {
    name: 'mute'
};
