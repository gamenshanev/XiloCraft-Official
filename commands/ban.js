const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var messageArray = message.content.split(" ")
    var agrument = messageArray.slice(1);


    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(agrument[0]));
    if (!banUser) return message.channel.send("Gebruiker is niet gevonden");
    var reason = agrument.join(" ").slice(22);
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, u hebt geen permission!!");
    if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Deze peroon kunt u niet bannen");
    var ban = new discord.RichEmbed()
    .setDescription("Bans")
    .setColor("#03fcec")
    .addField("Banned Gebruiker:", banUser)
    .addField("Gebant Door", message.author)
    .addField("Reden:", reason);

    var banChannel = message.guild.channels.find(`name`, "⚡other-logs⚡");
    if(!banChannel) return message.guild.send("kan het kanaal ⚡other-logs⚡ niet vinden");

    message.guild.member(banUser).ban(reason);
    banChannel.send(ban);
        return;
    
}


module.exports.help = {
    name: "ban"

}