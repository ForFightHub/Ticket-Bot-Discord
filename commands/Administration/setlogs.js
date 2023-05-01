const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

let channel = message.mentions.channels.first();
if(!channel || channel.type !== "text") return functions.errorEmbed(message, message.channel, "Lotfan Yek Channel Entekhab Konid");

let channelFetched = message.guild.channels.cache.find(c => c.id === channel.id);
if(!channelFetched || channelFetched.type !== "text") return functions.errorEmbed(message, message.channel, "Lotfan Yek Channel Entekhab Konid");

let embed = new Discord.MessageEmbed()
.setAuthor(`✅ | Log Set Shod`)
.setColor(color.none)
.setTimestamp()
.setFooter("Developed By For_Fight", `https://media.discordapp.net/attachments/1006579737424048210/1055053254121238578/Skeleton.png?width=500&height=500`)
.addField(`Channel Set Shode : `, channelFetched, true)
.addField(`Tavasote : `, message.author, true)
.addField(`Dar Tarikhe : `, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``, true);

db.set(`logs_${message.guild.id}`, channelFetched.id);
channelFetched.send(message.author, {embed: embed});
functions.successEmbed(message, message.channel, `Log Roye Channel Set Shod ${channelFetched}`);

}

exports.help = {
    name: "setlogs",
    aliases: ['logs', 'channel', 'log']
}