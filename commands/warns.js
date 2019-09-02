const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("sorry, je hebt geen permission")
        
var user  = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

if (!user) return message.channel.send("De gebruiker is niet op deze server, of je hebt geen gebruiker ingevoert");

if (user.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, je kunt deze persoon niet warnen");

var reason = args.join(" ").slice(22);

if (!reason) return message.channel.send("u heeft geen redenen ingevoert")

if (!warns[user.id]) warns[user.id] = {
warns:0


};
warns[user.id].warns++;

fs.writeFile("./warnings.json", JSON.stringify(warns), (err) =>{
    var WarnEmbed = new discord.RichEmbed()
    .setDescription("Warns")
    .setColor("#03fcec")
    .addField("Warned Gebruiker:", User)
    .addField("GeWarned Door", message.author)
    .addField("Aantal Warns", warns[user.id].warns)
    .addField("Reden:", reason);

    var warnChannel = message.guild.channels.find(`name`, "⚡other-logs⚡");
    if(!warnChannel) return message.guild.send("kan het kanaal ⚡other-logs⚡ niet vinden");

    warnChannel.send(WarnEmbed);
    if (warns[user.id].warns == 4) {
        var WarnMessage = new discord.RichEmbed()
        .setDescription("PAS OP " + user)
        .setColor("#03fcec")
        .addField("Bericht", "Nog 1 warn en het is ban!!!!!")
     message.channel.send(WarnMessage);



    } else if (warns[user.id].warns == 5) {

        message.guild.member(user).ban(reason);
        message.channel.send(`${user} is verbannen!!!`)



        
    }


});
}
module.exports.help = {
    name: "warn"

}