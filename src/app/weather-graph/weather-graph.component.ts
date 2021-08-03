import { Component, Input, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.scss']
})
export class WeatherGraphComponent implements OnInit {
@Input("hourly")
hourly:[]
  constructor() { }

  ngOnInit(): void {
   
  }

}
