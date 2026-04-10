# Discord Weather Bot

A Discord slash-command bot built with Bun, TypeScript, and discord.js that provides weather data using WeatherAPI.

## Project Scope

This project focuses on a simple and practical weather assistant for a single Discord server (guild-scoped commands).

Current scope includes:

- Current weather lookup for a location
- Multi-day forecast lookup for a location
- Sunrise and sunset time lookup for a location
- Unit selection for supported commands (Imperial or Metric)
- Automatic slash-command registration on bot startup

Implemented commands:

- /weather location:<city or zip> units:<imperial|metric>
- /forecast location:<city or zip> units:<imperial|metric>
- /sunrise location:<city or zip>

## Tech Stack

- Runtime: Bun
- Language: TypeScript
- Discord SDK: discord.js
- HTTP client: axios
- Weather provider: weatherapi.com

## Prerequisites

Install and configure the following first:

- Bun
- A Discord application and bot token
- A WeatherAPI key
- A Discord server (guild) ID where commands should be registered

## Environment Variables

Create a .env file in the project root with:

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_discord_server_id
WEATHER_API_KEY=your_weatherapi_key
```

Notes:

- Bun automatically loads .env files at runtime.
- Commands are registered as guild commands using CLIENT_ID and GUILD_ID.

## Install Dependencies

```bash
bun install
```

## Run The Project

Run once:

```bash
bun run start
```

Run in watch mode for development:

```bash
bun run dev
```

When startup succeeds, you should see logs similar to:

- Logged in as <bot_name>
- Started refreshing X command(s)
- Successfully reloaded X command(s)

## Project Structure

```text
src/
	index.ts                    App entry point and command registration in client collection
	commands/
		weather.ts                /weather command handler
		forecast.ts               /forecast command handler
		sunrise.ts                /sunrise command handler
	requests/
		fetchWeather.ts           Current weather API request and mapping
		fetchForecast.ts          Forecast API request and mapping
	events/
		clientReady.ts            Registers slash commands on ready
		interactionCreateEvent.ts Routes interactions to command handlers
	types/
		discord-client.d.ts       Client type augmentation for commands collection
```

## Troubleshooting

- Commands do not appear in Discord:
	- Verify CLIENT_ID and GUILD_ID are correct
	- Confirm the bot is invited to the target server with applications.commands scope
	- Restart the bot to trigger command refresh

- Bot starts but weather calls fail:
	- Check WEATHER_API_KEY
	- Confirm the key has access to required WeatherAPI endpoints

- Authentication errors on startup:
	- Verify DISCORD_TOKEN is valid and belongs to your bot application

## License

MIT
