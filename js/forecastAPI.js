class Forecast {
  constructor() {
    this.key = "QYitAxqKIA2SnJopiBObuAcEaRZa9M8t";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.cityGeoURI =
      "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    this.forecastURI =
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    this.currentCondition =
      "http://dataservice.accuweather.com/currentconditions/v1/";
  }

  async getCity(information) {
    if (!information.city) {
      const query = `?apikey=${this.key}&q=${information.latitude},${information.longitude}`;
      const response = await fetch(this.cityGeoURI + query);
      const data = await response.json();

      return data;
    } else {
      const query = `?apikey=${this.key}&q=${information.city}`;
      const response = await fetch(this.cityURI + query);
      const data = await response.json();

      return data;
    }
  }

  async getCurrentConditions(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;
    const response = await fetch(this.currentCondition + query);
    const data = await response.json();

    return data;
  }

  async getForecast(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;
    const response = await fetch(this.forecastURI + query);
    const forecast = await response.json();

    return forecast;
  }
}
