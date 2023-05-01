const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`storage/color.json`, `utf8`));

module.exports = {

    loadCommands: function(bot, dirname) {
        fs.readdir(dirname, (err, files) => {
            if(err) console.error(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if(jsFiles.length <= 0){
                console.log(`Command Morede Nazar Yaft Nashod : ${dirname.replace(/.\/commands\//gi, "")}`);
                return;
            }

            console.log("");
            console.log(`Commands ${dirname.replace(/.\/commands\//gi, "")}`);
            console.log("");
            jsFiles.forEach((f, i) => {
                delete require.cache[require.resolve(`${dirname}${f}`)];
                var props = require(`${dirname}${f}`);
                console.log(`${i + 1}: ${f} Loaded`);
                bot.commands.set(props.help.name, props);

                if(props.help.aliases) for (const alias of props.help.aliases){
                    bot.aliases.set(alias, props);
                }
            })
        })
    },

//Embed Error

  errorEmbed: function(message, channel, argument) {
    channel.send(new Discord.MessageEmbed().setDescription(`\\📛 **Error:** ${argument} \\📛`).setColor(color.red))
  },

  successEmbed: function(message, channel, argument) {
    channel.send(new Discord.MessageEmbed().setDescription(`\\✅ **Movafaghiat Amiz Bood:** ${argument}`).setColor(color.green))
  },

}
