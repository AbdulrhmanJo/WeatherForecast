const controller = (function(interface) {
  const forecast = new Forecast();
  const init = () => {
    interface.init();
    setUpEvent();
    setUpSpinner();
  };

  const setUpSpinner = () => {
    const mainCard = document.querySelector(".main-card");
    interface.showSpinner(mainCard);

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      interface.showSpinner(card);
    });
  };

  const setUpEvent = () => {
    window.addEventListener("load", getCurrentlocationWeather);

    const btn = document.querySelector(".nav");
    btn.addEventListener("click", getCurrentlocationWeather);

    const search = document.querySelector(".search");
    const cityName = document.querySelector(".name");

    let isFocused = cityName.matches(":focus");
    var firstClick = true;

    search.addEventListener("click", event => {
      if (isFocused || (firstClick && cityName.value === null)) {
        getCityWeather();
        isFocused = cityName.matches(":focus");
        firstClick = false;
      } else {
        changeInputField();
        isFocused = cityName.matches(":focus");
      }
    });
  };

  const changeInputField = () => {
    const cityName = document.querySelector(".name");
    cityName.select();
  };

  const getCurrentlocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUpSpinner();

        const info = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: ""
        };

        getCurrentWeather(info).then(data => {
          interface.hideSpinner();
          interface.displayMainCardWeather(data[0]);
        });

        getweatherForecast(info).then(data => {
          interface.displayWeather(data);
        });
        firstClick = false;
      }, handleErrors);
    }
  };

  const handleErrors = error => {
    if (error.code === 1) {
      const cityName = document.querySelector(".name");
      changeInputField();
    }
  };

  const getCurrentWeather = async information => {
    if (!information.city) {
      const city = await forecast.getCity(information);
      const currentWeather = await forecast.getCurrentConditions(city.Key);

      return currentWeather;
    } else {
      const city = await forecast.getCity(information);
      const currentWeather = await forecast.getCurrentConditions(city[0].Key);

      return currentWeather[0];
    }
  };

  const getweatherForecast = async information => {
    if (!information.city) {
      const city = await forecast.getCity(information);
      const forecasts = await forecast.getForecast(city.Key);

      return {
        forecast: forecasts,
        city: city
      };
    } else {
      const city = await forecast.getCity(information);
      const forecasts = await forecast.getForecast(city[0].Key);

      return {
        forecast: forecasts,
        city: city[0]
      };
    }
  };

  const getCityWeather = () => {
    setUpSpinner();
    const city = document.querySelector(".name");
    getCurrentWeather({
      latitude: 0,
      longitude: 0,
      city: city.value
    }).then(data => {
      interface.displayMainCardWeather(data);
    });

    getweatherForecast({
      latitude: 0,
      longitude: 0,
      city: city.value
    }).then(data => {
      interface.displayWeather(data);
    });
  };

  return {
    init: init
  };
})(interface);

controller.init();
