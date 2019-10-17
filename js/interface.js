const interface = (function() {
  const displayWeather = data => {
    const cityName = document.querySelector(".name");

    cityName.value =
      data.city.EnglishName + ", " + data.city.Country.EnglishName;

    const remainingForecast = data.forecast.DailyForecasts.filter(
      (element, index) => {
        if (index > 0) {
          return element;
        }
      }
    );

    displayForecastWeather(remainingForecast);
  };

  const displayMainCardWeather = weather => {
    const main = document.querySelector(".main-card");

    main.innerHTML = "";

    const card = `<p class="main-card-text">Today</p>
            <img src="img/${
              weather.WeatherIcon
            }.svg" alt="weather icon" class="main-card-icon">
            <p class="main-card-status">${weather.WeatherText}</p>
            <p class="main-card-degree">${Math.floor(
              weather.Temperature.Metric.Value
            )}\u2103</p>`;

    main.insertAdjacentHTML("afterbegin", card);
  };

  const convertToCelsius = degree => {
    return Math.ceil(((degree - 32) * 5) / 9);
  };

  const displayForecastWeather = data => {
    data.forEach((element, index) => {
      const card = document.querySelector(`.card-${index + 1}`);
      card.innerHTML = `<p class="card-day">${getDay(element.Date)}</p>
      <img src="img/${
        element.Day.Icon
      }.svg" alt="weather icon" class="card-icon">
      <p class="card-status">${element.Day.IconPhrase}</p>
      <div class="card-degree">
        <p class="card-degree-max">${convertToCelsius(
          element.Temperature.Maximum.Value
        )}\u2103</p>
        <p class="card-degree-min">${convertToCelsius(
          element.Temperature.Minimum.Value
        )}\u2103</p>`;
    });
  };

  const getDay = date => {
    const d = new Date(date);
    const day = d.getDay();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    return days[day];
  };

  const showSpinner = element => {
    element.innerHTML = "";
    const spinner = `<div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>`;

    element.insertAdjacentHTML("afterbegin", spinner);
  };

  const hideSpinner = () => {
    const spinners = document.querySelectorAll(".spinner");

    spinners.forEach(spinner => {
      spinner.style.display = "none";
    });
  };

  const init = () => {
    document.querySelector(".nav-item").classList.add("selected");
  };

  return {
    init: init,
    displayWeather: displayWeather,
    displayMainCardWeather: displayMainCardWeather,
    showSpinner: showSpinner,
    hideSpinner: hideSpinner
  };
})();
