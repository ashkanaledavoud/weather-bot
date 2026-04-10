import { ChatInputCommandInteraction } from 'discord.js';

const interactionCreateHandler = async (interaction: ChatInputCommandInteraction): Promise<void> => {
	if (!interaction.isChatInputCommand()) {
		return;
	}
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		return;
	}
	try {
		await command.execute(interaction);
		console.log(`${interaction.user.username} used command ${interaction.commandName}`);
	} catch (e) {
		console.error(e);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an another error executing this command!',
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: 'There was an another error executing this command!',
				ephemeral: true,
			});
		}
	}
};

export {
	interactionCreateHandler,
};