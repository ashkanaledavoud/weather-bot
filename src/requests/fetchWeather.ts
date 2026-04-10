import axios from 'axios';

const url = 'https://api.weatherapi.com/v1/current.json';

interface CurrentData {
    localtime: string;
	tempC: string;
	tempF: string;
	conditionText: string;
	conditionIcon: string;
	humidity: string;
	windKph: string;
	windMph: string;
    
}

interface CurrentInfo {
	locationName: string;
	weatherData: CurrentData;
}


const fetchWeather = async (location: string): Promise<CurrentInfo> => {
	try {
		const { data } = await axios({
			url,
			method: 'get',
			params: {
				q: location,
				key: process.env.WEATHER_API_KEY,
			},
			responseType: 'json',
		});

		const city = data.location.name;
		const country = data.location.country;
		const locationName = `${city}, ${country}`;

		const weatherData: CurrentData = {
			localtime: data.location.localtime,
			tempC: data.current.temp_c,
			tempF: data.current.temp_f,
			conditionText: data.current.condition.text,
			conditionIcon: data.current.condition.icon,
			humidity: data.current.humidity,
			windKph: data.current.wind_kph,
			windMph: data.current.wind_mph,
		};

		return {
			locationName,
			weatherData,
		};
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return {
            locationName: '',
            weatherData: {
                localtime: '',
                tempC: '',
                tempF: '',
                conditionText: '',
                conditionIcon: '',
                humidity: '',
                windKph: '',
                windMph: '',
            },
        };
    }
};

export {
	fetchWeather,
};
