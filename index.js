//First & .env
const Discord = require("discord.js");
const config = require("./storage/config.json");
require("dotenv").config();


//Client
const bot = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
});


//Set Perfix
client.config = {
  prefix: process.env.Prefix
}


//Activity List
const activities_list = [
    "Developed By For_Fight", 
    "Ticket Bot",
    `Use ${process.env.Prefix}help`,
    ]; 


//Ready
bot.on('ready', () => {
    console.log(`Bot Is Ready!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index]); 
    }, 10000); 
});


//Code
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.event = new Discord.Collection();

const loadCommands = require("./functions/commands.js");
const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadCommands.run(bot);
    await loadEvents.run(bot);
}

load();


//Login
bot.login(process.env.Token);
