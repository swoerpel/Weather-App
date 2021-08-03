import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { WeatherApp } from './model/weather';
import { WeatherServiceService } from './weather-service.service';
import { FormControl, Validators } from '@angular/forms';
import { Forecast } from './model/forecast';
import { Chart, registerables } from 'chart.js';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'weather-app';
  weather: WeatherApp ;
  city: string = 'Oraiokastro';
  lat: number;
  lon: number;
  isVisible: boolean = false;
  dailyForecast: Forecast[];
  hourlyForecast:[];
  email = new FormControl('', [Validators.required, Validators.email]);
  showForecast:boolean= false;
  chart:any

  ngOnInit(): void {
    this.getCityWeather();
    this.getFiveDayForecast();
  }
  constructor(
    private weatherService: WeatherServiceService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    Chart.register(...registerables);
    //  if (confirm("Share Location")) {
    //   this.getLocation();
    // }
    // else{
    //   this.getWeatherData();
    // }
  }
  ngAfterViewInit(): void {}

  getCityWeather() {
    this.weatherService.weatherByCity(this.city).subscribe((val) => {
      this.weather = val;
      console.log(val);
    });
  }
  onClick() {
    this.getCityWeather();
    this.getFiveDayForecast();
    this.getDailyForecast();
  }
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
    }
    this.getFiveDayForecast();
    this.getDailyForecast();
  }
  onChooseCity(event) {
    console.log(event);
    this. lat = event.coords.lat;
    this. lon = event.coords.lng;
    this.weatherService.weatherByLocation(this.lat, this.lon).subscribe((data) => {
      this.weather = data;
      this.city = this.weather.name;
    });

    this.isVisible = true;
    this.getFiveDayForecast();
    this.getDailyForecast();
  }

  getFiveDayForecast() {
    this.weatherService
      .forecastByCity(this.city)

      .subscribe((value) => {
        this.dailyForecast = this.FiveDayForecast(value);
        console.log(this.dailyForecast);
      });
  }
  getDailyForecast(){
    this.weatherService.dailyForecast(this.lat,this.lon)
    .subscribe(value => {
      let temp = value['hourly'].map(res => res.temp)
      let allDates = value['hourly'].map(res=> res.dt)
      let weatherDates =[]
      allDates.forEach((element) => {
        let jsDate = new Date(element * 1000)
        weatherDates.push(jsDate.toTimeString())
        
      });
     this.chart = new Chart('canvas',{
       type: 'line',
       data:{
         labels:weatherDates,
         datasets:[
           {
              data:temp,
              borderColor: '#3cbanf',
              fill:false
           
           },
          
         ]
       },
      
       })
    })
  }

  setWeatherData(): Object {
    return {
      name: this.weather.name,
      country: this.weather.sys.country,
      date: new Date(this.weather.dt * 1000).toLocaleDateString(),
      sunrise: new Date(this.weather.sys.sunrise * 1000).toLocaleTimeString(
        'en-US',
        { timeZoneName: 'short' }
      ),
      sunset: new Date(this.weather.sys.sunset * 1000).toLocaleTimeString(
        'en-US',
        { timeZoneName: 'short' }
      ),
      humidity: this.weather.main.humidity,
      pressure: this.weather.main.pressure,
      temp: this.weather.main.temp.toFixed(0),
      feels_like: this.weather.main.feels_like.toFixed(0),
      temp_max: this.weather.main.temp_max.toFixed(0),
      temp_min: this.weather.main.temp_min.toFixed(0),
      icon: this.weather.weather[0].icon,
      description: this.weather.weather[0].description,
    };
  }

  private FiveDayForecast(data: Forecast[]) {
    let weatherForecast: Forecast[] = [];
    for (let i = 0; i < data.length; i += 8) {
      weatherForecast.push(data[i]);
    }
    return weatherForecast;
  }
  toggleForecast(){
    this.showForecast = !this.showForecast;
  }

}
