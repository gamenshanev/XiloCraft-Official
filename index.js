const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <=0) { 

        console.log("kon geen files vinden")
        return;
    }
jsFiles.forEach((f,i) => {


    var filesGet = require(`./commands/${f}`);
    console.log(`De file ${f} is geladen`);
    bot.commands.set(filesGet.help.name, filesGet);

})


});

bot.on("ready", async () => {

    console.log(`${bot.user.username} Is online`)
    bot.user.setActivity("www.xilonetwork.ga", { type: "WATCHING" });
    bot.on("guildMemberAdd", member => {
        var role = member.guild.roles.find("name", "[S] Speler"); 
        if (!role) return;
        member.addRole(role);
 
        const channel = member.guild.channels.find("name", "👋welkom-leave👋");
        if (!channel) console.log("Kan het kanaal niet vinden.");
     
        var joinEmbed = new discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .setDescription(`Hoi ${member.user.username}, **Welkom op XiloCraft Discord Server**.`)
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter("Gebruiker gejoined.");
     
        channel.send(joinEmbed);
 

     
    });
    bot.on("guildMemberRemove", member => {
 
        const channel = member.guild.channels.find("name", "👋welkom-leave👋");
        if (!channel) console.log("Kan het kanaal niet vinden.");
     
        var leaveEmbed = new discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter("Gebruiker Geleaved.");
     
        channel.send(leaveEmbed);
     
    });

});


bot.on("message", async message => {  

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    var prefix = botConfig.prefix;
    var messageArray = message.content.split(" ")
    var command = messageArray[0];
    var agrument = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot, message, agrument);
  
});

bot.login(botConfig.token);