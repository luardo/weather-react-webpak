import Service from "./Service.js";

export default class DarkskyService extends Service {
  constructor() {
    super();
    this.proxy = "https://cors-anywhere.herokuapp.com/";
    this.baseUrl = "https://api.darksky.net/forecast/";
    this.key = "2531b31fcac013a100c0bbf4eb586d5f";
    this.coordinates = "52.5200,-13.4050";

    this.city = null;
    this.temperature = null;
    this.summary = null;
  }

  getDate(timestamp) {
    const currentDate = new Date(timestamp * 1000);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return day + "/" + month + "/" + year;
  }

  getCurrent() {
    const requestUrl =
      this.proxy +
      this.baseUrl +
      this.key +
      "/" +
      this.coordinates +
      "/?units=si";

    return this.getRequest("GET", requestUrl).then(
      ({ data: { currently, daily } }) => {
        return {
          temperature: Math.round(currently.temperature) + "°",
          city: "Berlixn",
          icon: currently.icon,
          dateTime: this.getDate(currently.time),
          warning: daily.summary,
          summary: currently.summary,
          wind: currently.windSpeed,
          humidity: currently.humidity + "%"
        };
      }
    );
  }
}
