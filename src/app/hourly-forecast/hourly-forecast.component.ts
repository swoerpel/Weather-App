import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent implements OnInit {
  @Input()
  $hourlyForecast

  chart:Chart

  constructor() { }

  ngOnInit(): void {
   this.$hourlyForecast .subscribe((value) => {
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

      //  newChart.destroy();
    });
    this.chart.destroy();
  }

}
