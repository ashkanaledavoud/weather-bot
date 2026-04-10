import { Client, REST, Routes, Snowflake } from 'discord.js';

const discordToken = process.env.DISCORD_TOKEN as string;
const clientID = process.env.CLIENT_ID as Snowflake;
const guildID = process.env.GUILD_ID as Snowflake;

const rest = new REST({
	version: '10',
}).setToken(discordToken);

const clientReadyHandler = async (client: Client): Promise<void> => {
	console.log(`Logged in as ${client.user.tag}!`);
	try {
		console.log(`Started refreshing ${client.commands.size} command(s)!`);
		const data = await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{
				body: client.commands.map((command) => {
					return command.data.toJSON();
				}),
			},
		);
		console.log(`Successfully reloaded ${data.length} command(s)!`);
	} catch (error: Error) {
		console.error(error);
	}
};

export {
	clientReadyHandler,
};
