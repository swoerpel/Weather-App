import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../model/forecast';

@Component({
  selector: 'daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css'],
})
export class DailyForecastComponent implements OnInit {
  @Input()
  weatherForecast:Forecast[];
  @Input()
  degree

  ngOnInit(): void {
   
  }
  constructor() {}
  
  
}
