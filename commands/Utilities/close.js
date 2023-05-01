const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

    if(!message.channel.name.startsWith(`ticket-`)) return;
    
    if(message.author.id === db.get(`ticket.${message.channel.name}.user`)) {
    
      let userEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️ | Ticket Delete Shod`)
      .setColor(color.none)
      .setDescription(`User Ticket Khod Ra Baraye Delete Shodan Taiid Kard Va Delete Shod`)
      .setTimestamp()
      .setFooter("Developed By For_Fight", `https://media.discordapp.net/attachments/1006579737424048210/1055053254121238578/Skeleton.png?width=500&height=500`)
      .addField(`Etelat`, `**Tavasote :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
      db.delete(`ticket.${message.channel.name}`);
      if(logsChannel) await logsChannel.send(userEmbed);
      await message.channel.delete();
    } else {
    
      let support = message.guild.roles.cache.find(r => r.name === "Ticket Support");
      if(!support) return functions.errorEmbed(message, message.channel, "Error");
      if(message.deletable) message.delete();
    
      if(args[0] === "force"){
    
        let forceEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Delete Shod`)
        .setColor(color.none)
        .setDescription(`Yek Shakhs Ba Role ${support} Ticket Ra Bast Va Delete Kard`)
        .setTimestamp()
        .setFooter("Developed By For_Fight", `https://media.discordapp.net/attachments/1006579737424048210/1055053254121238578/Skeleton.png?width=500&height=500`)
        .addField(`Etelat`, `**Tavasote :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`📥 | Ticket Delete Shod`)
        .setColor(color.blue)
        .setFooter("Developed By For_Fight", `https://media.discordapp.net/attachments/1006579737424048210/1055053254121238578/Skeleton.png?width=500&height=500`)
        .setDescription(`\`${message.author.tag}\` Ticket Khod Ra Bast`);
        db.delete(`ticket.${message.channel.name}`);
        if(logsChannel) await logsChannel.send(forceEmbed);
        if(bot.users.cache.get(db.get(`ticket.${message.channel.name}.user`))) bot.users.cache.get(db.get(`ticket.${message.channel.name}.user`)).send(embed1).catch(e => {console.log(e)})
        message.channel.delete();
        
    
      } else {
    
        let staffEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️| Dar Khast Delete Shodan Ticket`)
      .setColor(color.none)
      .setDescription(`Yek User Ba Role ${support} Darkhast Bastn Va Delete Krdan Ticket Kard`)
      .setTimestamp()
      .setFooter("Developed By For_Fight", `https://media.discordapp.net/attachments/1006579737424048210/1055053254121238578/Skeleton.png?width=500&height=500`)
      .addField(`Etelat`, `**Utilisateur :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        if(!message.guild.member(message.author).roles.cache.has(support.id)) return functions.errorEmbed(message, message.channel, "Shoma Role `Ticket Support` Ra Nadarid.");
        let embed2 = new Discord.MessageEmbed()
        .setColor(color.green)
        .setTitle(`🎟️ | Ticket Kamel Shod`)
        .setDescription(`baraye Bastane Ticket Az \\🗑️ Estefade Konid Va Dar Gheyre In Sorat Hich Vakoneshi Anjam Nadid.`);
        if(logsChannel) await logsChannel.send(staffEmbed);
        message.channel.send(embed2).then(m => m.react(`🗑️`));
      }
    
    }

}

exports.help = {
    name: "close",
    aliases: []
}
