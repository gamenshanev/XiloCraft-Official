const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    var botIcon = bot.user.displayAvatarURL;
    var botEmbed = new discord.RichEmbed()
        .setDescription("Info")
        .setColor("#03fcec")
        .setThumbnail(botIcon)
        .addField("BotNaam:", bot.user.username)
        .addField("Gemaakt op:", bot.user.createdAt);
    return message.channel.send(botEmbed);
}


module.exports.help = {
    name: "info"

}