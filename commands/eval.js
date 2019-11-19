const Discord = require("discord.js");

function clean(text) {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

module.exports = {
	name: "eval",
	description: "Evaluates the JavaScript code.\nThis command can only be used by the bot owner.",
	usage: "<code>",
	ownerOnly: true,
	hidden: true,
	async run(client, msg, args, prefix) {
		args = msg.content.slice(prefix.length).split(/ +/)
		args.shift();
		for (let arg of args) arg.trim();
		const code = args.join(" ");
		let evaled = eval(code);
		if (typeof evaled != "string")
			evaled = require("util").inspect(evaled);
		await msg.channel.send(clean(evaled), { code: "xl" })
	}
};
