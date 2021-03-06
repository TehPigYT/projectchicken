const Discord = require("discord.js");
const hastebin = require('hastebin-gen');
const ownerID = '293148538886553602'
module.exports.run = async (bot, message, args) => {
    if (message.author.id != ownerID) return message.channel.send("Bot Owner Only");
	let users = bot.users;

	let searchTerm = args[0];
	if(!searchTerm) return message.channel.send("Please provide a search term.");
  
	let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
  let bestMatch = matches.map(u => u.tag).join("\n");
  let ids = matches.map(u => u.id).join("\n");
  if(bestMatch.length > 1000){
    hastebin(bestMatch + ids, "txt").then(r => {
    message.channel.send(`Output was too large. Data was exported to hastebin! ${r}`)
}).catch(console.error);
  
  }else{
  const embed = new Discord.RichEmbed()
            .setTitle("All the users found.")
            .setColor(0x26a98b)
            .setDescription(bestMatch + ids);
        message.channel.send(embed);
  }

}

exports.config = {
    aliases: [  ]
};
 
module.exports.help = {
  name: "find"
}
