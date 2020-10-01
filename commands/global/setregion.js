const Discord = require("discord.js");
module.exports = {
	name: 'setregion',
	aliases: ['region'],
	execute: async (client, msg, args) => {

		const serverRegion = args[0];

		if (!serverRegion) return msg.reply("Please use \`\`src!setregion <amsterdam, london>\`\`")
		if (serverRegion === "amsterdam" || serverRegion === "london") {

			const embedColor = msg.guild.me.displayColor;

			msg.guild.setRegion(serverRegion.toLowerCase())
			const embed = new Discord.MessageEmbed()
				.setColor("#" + embedColor.toString(16))
				.setDescription(`The region of this server has been succesfully changed to: \`\`\`\md\n${serverRegion}\`\`\``)

			await msg.channel.send(embed);
		} else {
			return msg.reply("Invalid region, please choose one of the following: \`\`amsterdam, london\`\`")
		}
	}
};
