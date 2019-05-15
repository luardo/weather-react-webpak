import React from "react";

import DarkSkyService from "./services/DarkSkyService.js";
import UnsplashService from "./services/UnsplashService";

import "./App.scss";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: "",
      weather: {
        temperature: "",
        city: "Berlin",
        icon: "",
        dateTime: "",
        warning: "",
        wind: "",
        humidity: ""
      }
    };
  }

  componentWillMount() {
    const darkSky = new DarkSkyService();
    const unsplash = new UnsplashService();

    darkSky
      .getCurrent()
      .then(currentWeather => {
        this.setState({
          weather: currentWeather
        });
        return unsplash.getPhoto(currentWeather.icon);
      })
      .then(image => this.setState({ backgroundImage: image }));
  }
  render() {
    const {
      temperature,
      dateTime,
      warning,
      wind,
      humidity,
      summary
    } = this.state.weather;
    const backgroundStyles = {
      backgroundImage: "url(" + this.state.backgroundImage + ")"
    };
    return (
      <div className="weather">
        <div className="weather__background" style={backgroundStyles} />
        <section className="weather__wrapper">
          <div
            className="weather__temperature
                    weather--left-column"
          >
            {temperature}
          </div>

          <div className="weather--right-column weather__details">
            <div className="weather__details-item">{summary}</div>
            <div className="weather__details-item">{dateTime}</div>
            <div className="weather__details-item">Wind speed: {wind}</div>
            <div className="weather__details-item">Humidity: {humidity}</div>
          </div>
        </section>
        <section className="weather__footer">
          <div className="weather__details-item">{warning}</div>
        </section>
      </div>
    );
  }
}
