const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {

let helpMessage = new discord.RichEmbed()
.setColor("#00ffd5")
.addField("Commands: ", "Prefix: !") 
.addField("warn", "Warn een gebruiker")
.addField("help", "toon het help menu")
.addField("kick", "Kick een gebruiker")
.addField("ban", "Ban een gebruiker")
.addField("tempmute", "Tempmute een gebruiker")
.addField("ticket", "maak een ticket aan")
.addField("close", "close een ticket")
.addField("test", "test de bot")
.addField("info", "Krijg info over de bot")
.addField("announcement", "plaats een bericht in meldingen")
.addField("Report", "Report een gebruiker")
.addField("idee", "Zet een idee, hij word automatisch in het ideeën kanaal gezet")
.addField("solli", "maak een solliticket aan")
.addField("solliclose", "close een solliticket")
.setFooter("Einde helpmenu");

message.channel.send(helpMessage);
}
module.exports.help = {
    name: "help",
    description: "Hier is het help menu"
}