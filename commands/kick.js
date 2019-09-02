const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var messageArray = message.content.split(" ")
    var agrument = messageArray.slice(1);


var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(agrument[0]));
if (!kickUser) return message.channel.send("Gebruiker is niet gevonden");
var reason = agrument.join(" ").slice(22);
if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, u hebt geen permission!!");
if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Deze peroon kunt u niet kicken");
var kick = new discord.RichEmbed()
.setDescription("Kick")
.setColor("#03fcec")
.addField("Kicked Gebruiker:", kickUser)
.addField("Gekickt Door", message.author)
.addField("Reden:", reason);

var kickChannel = message.guild.channels.find(`name`, "⚡other-logs⚡");
if(!kickChannel) return message.guild.send("kan het kanaal ⚡other-logs⚡ niet vinden");

message.guild.member(kickUser).kick(reason);
kickChannel.send(kick);


return;

}
module.exports.help = {
    name: "kick"

}


