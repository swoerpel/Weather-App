import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../model/forecast';

@Component({
  selector: 'app-forecast-data',
  templateUrl: './forecast-data.component.html',
  styleUrls: ['./forecast-data.component.css'],
})
export class ForecastDataComponent implements OnInit {
  @Input()
  weatherForecast:Forecast[];
  degree:string="°C"

  ngOnInit(): void {
   
  }
  constructor() {}
  
  
}
