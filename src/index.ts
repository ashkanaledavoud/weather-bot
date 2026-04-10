import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

import { weatherData, executeWeatherCommand } from './commands/weather';
import { forecastData, executeForecastCommand } from './commands/forecast';
import { sunriseData, executesunriseCommand } from './commands/sunrise';
import { clientReadyHandler } from './events/clientReady';
import { interactionCreateHandler } from './events/interactionCreateEvent';

const client = new Client({
	intents: GatewayIntentBits.Guilds,
});

// Initialize commands collection
client.commands = new Collection();

client.commands.set(weatherData.name, {
	data: weatherData,
	execute: executeWeatherCommand,
});

client.commands.set(forecastData.name, {
	data: forecastData,
	execute: executeForecastCommand,
});

client.commands.set(sunriseData.name, {
	data: sunriseData,
	execute: executesunriseCommand,
});


client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

await client.login();
