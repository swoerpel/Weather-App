import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WeatherApp } from './model/weather';
import { WeatherServiceService } from './weather-service.service';
import { FormControl, Validators } from '@angular/forms';
import { Forecast } from './model/forecast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'weather-app';
  weather: WeatherApp;
  city: string = 'Tirana';
  lat: number;
  lon: number;
  isVisibleMarker: boolean = false;
  dailyForecast: Forecast[];
  hourlyForecast: [];
  email = new FormControl('', [Validators.required, Validators.email]);
  showForecast: boolean = true;

  ngOnInit(): void {
    this.getCityWeather();
    this.getDailyForecast();
    this.getHourlyForecast();
  }
  constructor(private weatherService: WeatherServiceService) {
    //  if (confirm("Share Location")) {
    //   this.getLocation();
    // }
    // else{
    //   this.getWeatherData();
    // }
  }
  ngAfterViewInit(): void {}

  //Retrieve cordinates and display data for current location.
  location() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherService
          .weatherByLocation(this.lat, this.lon)
          .subscribe((data) => {
            this.weather = data;
          });
      });
      this.getDailyForecast();
      this.getHourlyForecast();
    }
  }

  // update evrything when searching for a location
  onSearchClick() {
    this.getCityWeather();
  }

  getCityWeather() {
    this.weatherService.weatherByCity(this.city).subscribe((val) => {
      this.weather = val;
      console.log(val);
      this.lat = this.weather.coord.lat;
      this.lon = this.weather.coord.lon;
      this.getHourlyForecast();
      this.getDailyForecast();
    });
  }

  //Display the data of the city clicked in the map location.
  onMapClick(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;
    this.weatherService
      .weatherByLocation(this.lat, this.lon)
      .subscribe((data) => {
        this.weather = data;
        this.city = this.weather.name;
      });

    this.isVisibleMarker = true;
    this.getDailyForecast();
    this.getHourlyForecast();
  }

  getDailyForecast() {
    this.weatherService
      .dailyForecastByCity(this.city)

      .subscribe((value) => {
        this.dailyForecast = this.fiveDayForecast(value);
        console.log(this.dailyForecast);
      });
  }
  getHourlyForecast() {
    return this.weatherService.hourlyForecast(this.lat, this.lon);
  }

  //Provide only the data of the five different days.
  private fiveDayForecast(data: Forecast[]) {
    let weatherForecast: Forecast[] = [];
    for (let i = 0; i < data.length; i += 8) {
      weatherForecast.push(data[i]);
    }
    return weatherForecast;
  }

  toggleForecast() {
    this.showForecast = !this.showForecast;
  }
}
