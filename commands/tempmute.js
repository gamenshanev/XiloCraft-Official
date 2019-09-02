const discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("sorry, je hebt geen permission")
        
    var user  = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    
    if (!user) return message.channel.send("De gebruiker is niet op deze server, of je hebt geen gebruiker ingevoert");
    
    if (user.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, je kunt deze persoon niet muten");

    var muteRole = message.guild.rolels.find("name", "Muted");
    if(!muteRole) return message.channel.send("sorry, je hebt geen role met de naam Muted")

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("sorry, je hebt geen tijd opgegeven")

    await (user.addRole(muteRole.id))

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function() {  
        user.removeRole(muteRole.id)

        message.channel.send(`${user} is geunmuted`);

    }, ms (muteTime));
}
module.exports.help = {
    name: "tempmute"

}