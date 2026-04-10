import { SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js/typings';

import { fetchForecast } from '../requests/fetchForecast.ts';

const forecastData = new SlashCommandBuilder()
	.setName('forecast')
	.setDescription('Get the weather forecast for a location.')
	.addStringOption((option: SlashCommandStringOption) => {
		return option
			.setName('location')
			.setDescription('The location can be a city, zip/postal code.')
			.setRequired(true);
	})
	.addStringOption((option: SlashCommandStringOption) => {
		return option
			.setName('units')
			.setDescription('Choose "Imperial" or "Metric".')
			.setRequired(false)
			.addChoices([
				{ name: 'Imperial', value: 'imperial' },
				{ name: 'Metric', value: 'metric' },
			] as any);
	});

const executeForecastCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
	await interaction.deferReply();

	const location = String(interaction.options.getString('location'));
	const units = interaction.options.getString('units') || 'imperial';
	const isImperial = units === 'imperial';

	const { weatherData, locationName } = await fetchForecast(location);
	try {

		const embed = new EmbedBuilder()
			.setColor(0x6D8196)
			.setTitle(`Weather Forecast for ${locationName}:`)
			.setDescription(`Using the ${units} system.`)
			.setTimestamp()
			.setFooter({
				text: 'Powered by weatherapi.com API',
			});

		for (const day of weatherData) {
			const minTemp = isImperial ? day.tempMinF : day.tempMinC;
			const maxTemp = isImperial ? day.tempMaxF : day.tempMaxC;
			const avgTemp = isImperial ? day.tempAvgF : day.tempAvgC;

			// FIXME: This returns a URL string instead of an actual emoji.
			//const condition_icon = day.conditionIcon.startsWith('//') ? `https:${day.conditionIcon}` : day.conditionIcon;

			const fields: any = {
				name: day.date,
				value: 
					`
					Condition: ${day.conditionText}
					⬇️ Low: ${minTemp}° ⬆️ High: ${maxTemp}° 🌡️ Avg: ${avgTemp}°\n
					`,
			};

			embed.addFields(fields);
		}

		await interaction.editReply({
			embeds: [
				embed,
			],
		} as any);
	} catch (error: Error) {
		await interaction.editReply(error.message);
		throw new Error(`Error fetching forecast for ${locationName}`);
	}
};

export {
	forecastData,
	executeForecastCommand,
};
