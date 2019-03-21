class OpenWeatherMapClient {
  constructor() {
    this.appId = "a3e7bdc246b811691b06aab13ccb0dbb";
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }

  async getWeather() {
    let data;

    try {
      const position = await this.getCurrentLocation();
      data = await this.callAPI("weather", position.coords);
    } catch (err) {
      data = this.getErrorData();
    }

    return this.denormalize(data);
  }

  async getForecast() {
    let data;

    try {
      const position = await this.getCurrentLocation();
      data = await this.callAPI("forecast", position.coords);
    } catch (err) {
      data = this.getErrorData();
    }

    return this.denormalizeForecast(data);
  }

  async callAPI(type, coordinates) {
    const endpoint = `https://api.openweathermap.org/data/2.5/${type}?lat=${coordinates.latitude}&lon=${
      coordinates.longitude
    }&appid=${this.appId}&units=metric`;
    const response = await fetch(endpoint);

    return await response.json();
  }

  getErrorData() {
    return {
      clouds: { all: 0 },
      wind: { speed: 0 },
      main: {
        humidity: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0
      },
      weather: [
        {
          id: 0,
          icon: "01d",
          description: `There's a problem at the weather forecast server ¯\\_(ツ)_/¯`
        }
      ],
      name: null,
      sys: {
        country: null
      }
    };
  }

  denormalizeForecast(data) {
    const forecast = data.list
      .filter(item => {
        const date = new Date(item.dt_txt);

        return date.getDate() !== new Date().getDate() && date.getHours() === 12;
      })
      .map(item => ({ ...this.denormalize(item), dt_txt: item.dt_txt }));
    console.log(forecast);
    return forecast;
  }

  denormalize(data) {
    return {
      cloudiness: data.clouds.all,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      temperatureValue: Math.round(data.main.temp),
      temperatureHigh: Math.round(data.main.temp_max),
      temperatureLow: Math.round(data.main.temp_min),
      location: this.formatLocation(data.name, data.sys.country),
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  }

  formatLocation(city, country) {
    if (city === null && country === null) {
      return "";
    }

    return `${city}, ${country}`;
  }
}

export default OpenWeatherMapClient;
