const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    if (message.content === '?help') {
        message.react('✅');
    } 

let embed = new Discord.MessageEmbed()

   .setTitle(`Ticket`)
   .setDescription(`Hey @${message.author.tag} Mamnoon Az In Az Bot Ma Estefade Kardid`)
   .setColor(`#F9A72D`)
   .addField("```$setlogs```", "Set Kardan Log Ticket ```?setlogs #channel```", false)
   .addField("```?ticket```", "Sakhtane Ticket ```?ticket```", false)
   .addField("```?close```", "Bastan Ya Delete Kardan Channel ```?close```", false)
   .setFooter("Developed By For_Fight", `https://media.discordapp.net/attachments/1006579737424048210/1055053254121238578/Skeleton.png?width=500&height=500`)
   return message.channel.send(embed);

}
exports.help = {
    name: "help",
}