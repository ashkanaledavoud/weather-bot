import {
	Collection,
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

interface Command {
	data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Extend the Client to add a `commands` property
declare module 'discord.js' {
	interface Client {
		commands: Collection<string, Command>;
	}
}