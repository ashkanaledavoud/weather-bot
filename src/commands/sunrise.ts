import { SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { fetchForecast } from '../requests/fetchForecast.ts';

const sunriseData = new SlashCommandBuilder()
	.setName('sunrise')
	.setDescription('Get the sunrise and sunset forecast for a location.')
	.addStringOption((option: SlashCommandStringOption) => {
		return option
			.setName('location')
			.setDescription('The location can be a city, zip/postal code.')
			.setRequired(true);
	});

const executesunriseCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
	await interaction.deferReply();

	const location = String(interaction.options.getString('location'));


	const { weatherData, locationName } = await fetchForecast(location);
	try {

		const embeds: EmbedBuilder[] = [];

		for (const day of weatherData) {

			const date = new Date(day.date);
			const formattedDate = `${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}-${date.getUTCFullYear()}`;

			const fields: any = {
				name: formattedDate,
				value:
					`
					🌞 Sunrise ${day.sunriseTime}\n
					🌚 Sunset ${day.sunsetTime}\n
					`,
			};

			embeds.push(
				new EmbedBuilder()
					.setColor(0x6D8196)
					.setTitle(`Sunrise and Sunset Forecast for ${locationName}`)
					.setTimestamp()
					.setFooter({ text: 'Powered by weatherapi.com API.' })
					.addFields(fields),
			);
		}
			await interaction.editReply({ embeds: embeds } as any);
	} catch (error: Error) {
		await interaction.editReply(error.message);
		throw new Error(`Error fetching forecast for ${locationName}`);
	}
};

export {
	sunriseData,
	executesunriseCommand,
};
