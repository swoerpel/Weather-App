import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  @Input()
  weatherData
  now:string;
  degree:string="°C"

  constructor() { 
    setInterval(()=>{
      this.now= new Date().toLocaleTimeString()
    },1)
  }

  ngOnInit(): void {
  }

  

}
