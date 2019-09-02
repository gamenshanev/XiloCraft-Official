const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // Id van category van tickets.
    const categoryId = "617416672361578551";

    // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
    if (message.channel.parentID == categoryId) {

        message.channel.delete();

    } else {

        message.channel.send("Gelieve dit commando in een solli kanaal te doen.");

    }

    var embedCloseTicket = new discord.RichEmbed()
        .setTitle("Hoi, " + message.channel.name)
        .setDescription("Je solli is gemarkeerd als **compleet**. Wil je een nieuwe maken doe dan !solli")
        .setFooter("ticket gesloten");

    // Vind kanaal voor de logs.
    var logChannel = message.guild.channels.find("name", "🎫tickets🎫");
    if (!logChannel) return message.channel.send("Kanaal bestaat niet");

    logChannel.send(embedCloseTicket);

}

module.exports.help = {
    name: "solliclose",
    description: "Sluit een ticket af"
}