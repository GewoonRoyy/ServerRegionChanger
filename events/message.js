const Discord = require("discord.js");
const fs = require("fs");
const { sep } = require("path");

module.exports = async (client, msg) => {
	const PREFIX = "src!";

	if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

	const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  client.commands = new Discord.Collection();

  const load = (dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
      const commands = fs.readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));
      for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);
        client.commands.set(command.name, command);
      }
    })
  };
  load();

  const finalCmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (!finalCmd) return;

  finalCmd.execute(client, msg, args);
}