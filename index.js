const Discord = require("discord.js");
const Client = require("discord.js");

const client = new Discord.Client ({
	"disableEveryone": true,
	"fetchAllMembers": true,
});

client.on("ready", () => {
 	console.log(`Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);
});

client.on('message', async (msg) => {
   require('./events/message.js')(client, msg);
});

client.login(process.env.BOT_TOKEN);