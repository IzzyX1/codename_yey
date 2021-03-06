module.exports = {
	name: "purge",
	group: "moderationGroup",
	description: "purgeDescription",
	guildOnly: true,
	requiredPermissions: "manageMessages",
	usage: "purgeUsage",
	async run(client, msg, args, prefix, lang) {
		if (!args.length)
			return msg.channel.createMessage(lang.commandUsage(prefix, this));

		const amount = parseInt(args[0]);

		if (isNaN(amount))
			return msg.channel.createMessage(lang.amountIsNaN);

		if (amount < 1)
			return msg.channel.createMessage(lang.notLessThan1Msg);
		if (amount > 100)
			return msg.channel.createMessage(lang.notMoreThan100Msgs);

		await msg.channel.purge(amount + 1);

		const embed = {
			title: lang.purgeSuccess(amount),
			description: lang.msgWillBeDeleted,
			timestamp: new Date().toISOString(),
			color: 3066993,
		};

		const message = await msg.channel.createMessage({ embed: embed });
		setTimeout(() => {
			message.delete().catch(() => {});
		}, 5000);
	}
};
