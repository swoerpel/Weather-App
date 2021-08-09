import {  Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherApp } from './model/weather';
import { WeatherServiceService } from './weather-service.service';

import { Forecast } from './model/forecast';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'weather-app';
  weather: WeatherApp;
  city: string = 'Tirana';
  lat: number;
  lon: number;
  isVisibleMarker: boolean = false;
  dailyForecast: Forecast[];
  hourlyForecast: [];
  showForecast: boolean = true;
  degree:string = '°C';
  units:string = 'metric';
  chart:Chart;

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
  ngOnDestroy(): void {
    
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
    this.weatherService.hourlyForecast(this.lat, this.lon)
    .subscribe((value) => {
      let temp = value['hourly'].map((res) => res.temp);
      let allDates = value['hourly'].map((res) => res.dt);
      let weatherDates = [];
      allDates.forEach((element) => {
        let jsDate = new Date(element * 1000);
        weatherDates.push(jsDate.toLocaleTimeString([], { hour: 'numeric' }));
      });

      this.chart = new Chart('myChart', {
        type: 'line',

        data: {
          labels: weatherDates,

          datasets: [
            {
              label: 'temp',

              data: temp,
              borderColor: 'red',

              pointBorderColor: '#1231e2',
              borderWidth: 0.7,

              hoverBorderWidth: 20,
              pointBackgroundColor: 'white',
              pointHoverBackgroundColor: 'red',
              pointRadius: 2,

              
            },
          ],
        },
        options: {
          aspectRatio: 2,

          responsive: true,
          plugins: {
            filler: {
              drawTime: 'beforeDatasetsDraw',
            },
          },
        },
      });

    
    });
    this.chart.destroy();
  
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
  toFarhenheit(){
    this.degree = '°F';
    this.weatherService.units = 'imperial'
    this.getCityWeather();
    this.getDailyForecast();
    this.getHourlyForecast();
  }
  toCelcius(){
    this.degree = '°C';
    this.weatherService.units = 'metric'
    this.getCityWeather();
    this.getDailyForecast();
    this.getHourlyForecast();
  }
}
