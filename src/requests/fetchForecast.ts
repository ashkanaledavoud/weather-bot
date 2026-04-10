import axios from 'axios';

const url = 'https://api.weatherapi.com/v1/forecast.json';
const forecastDays = 3;

interface ForecastData {
	date: string;
	tempMinC: string;
	tempMaxC: string;
	tempMinF: string;
	tempMaxF: string;
	tempAvgC: string;
	tempAvgF: string;
	conditionText: string;
	conditionIcon: string;
	sunriseTime: string;
	sunsetTime: string;
}

interface ForecastInfo {
	locationName: string;
	weatherData: ForecastData[];
}


const fetchForecast = async (location: string): Promise<ForecastInfo> => {
	try {
		const { data } = await axios({
			url,
			method: 'get',
			params: {
				q: location,
				days: forecastDays,
				key: process.env.WEATHER_API_KEY,
			},
			responseType: 'json',
		});

		const city = data.location.name;
		const country = data.location.country;
		const locationName = `${city}, ${country}`;

		const weatherData: ForecastData[] = data.forecast.forecastday.map((forecastDay) => {
			return {
				date: forecastDay.date,
				tempMinC: forecastDay.day.mintemp_c,
				tempMaxC: forecastDay.day.maxtemp_c,
				tempMinF: forecastDay.day.mintemp_f,
				tempMaxF: forecastDay.day.maxtemp_f,
				tempAvgC: forecastDay.day.avgtemp_c,
				tempAvgF: forecastDay.day.avgtemp_f,
				conditionText: forecastDay.day.condition.text,
				conditionIcon: forecastDay.day.condition.icon,
				sunriseTime: forecastDay.astro.sunrise,
				sunsetTime: forecastDay.astro.sunset,
			};
		});

		return {
			locationName,
			weatherData,
		};
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return { locationName: '', weatherData: [] };
    }
};

export {
	fetchForecast,
};
