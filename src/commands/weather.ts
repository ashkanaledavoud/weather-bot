import { SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js/typings';

import { fetchWeather } from '../requests/fetchWeather.ts';

const weatherData = new SlashCommandBuilder()
	.setName('weather')
	.setDescription('Get the current weather for a location.')
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

const executeWeatherCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const location = String(interaction.options.getString('location'));
    const units = interaction.options.getString('units') || 'imperial';
    const isImperial = units === 'imperial';

    const { weatherData, locationName } = await fetchWeather(location);

    try {
        const embed = new EmbedBuilder()
            .setColor(0x6D8196)
            .setTitle(`Current Weather for ${locationName}:`)
            .setDescription(`Using the ${units} system.`)
            .setTimestamp()
            .setFooter({ text: 'Powered by weatherapi.com API', 
             });

        const currTemp = isImperial ? weatherData.tempF : weatherData.tempC;
        const currWind = isImperial ? weatherData.windMph : weatherData.windKph;
        const windUnit = isImperial ? 'mph' : 'kph';

        const fields: any = {
            name: weatherData.localtime,
            value: 
            `
                Condition: ${weatherData.conditionText}\n
                Temperature: ${currTemp}°\n
                Humidity: ${weatherData.humidity}%\n
                Wind: ${currWind} ${windUnit}\n
            `,
        };

        embed.addFields(fields);

        await interaction.editReply({ embeds: [embed] } as any);
    } catch (error) {
        console.error(error);
        await interaction.editReply('Failed to fetch weather data.');
    }
};

export {
	weatherData,
	executeWeatherCommand,
};
