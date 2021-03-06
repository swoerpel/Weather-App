import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';
import { WeatherApp } from './model/weather';
import { Forecast } from './model/forecast';
import { weatherApi } from 'src/assets/api-key';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  apiKey:string = weatherApi();
  weatherURL = 'http://api.openweathermap.org/data/2.5/weather?'
  forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?'
  hourlyUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
  weather: WeatherApp
  units:string = 'metric'


  constructor(private http: HttpClient) {




  }
  weatherByCity(city: string) {
    return this.http.get(this.weatherURL + 'q=' + city + '&units='+ this.units + '&appid=' + this.apiKey)
      .pipe(
        map((resp: WeatherApp) => {
          return resp;

        }))
  }
  weatherByLocation(lat: number, lon: number) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +'&units='+ this.units + '&appid=' + this.apiKey)
      .pipe(
        map((resp: WeatherApp) => {
          return resp
        }));
  }
  dailyForecastByCity(city: string): Observable<Forecast[]> {

    return this.http.get(this.forecastURL + 'q=' + city + '&units=' + this.units + '&appid=' + this.apiKey)
      .pipe(
        map((resp) => {
          return resp['list'];
        }),
        map((resp: Forecast[]) => {
          console.log(resp);
          return resp;
        }))



  }
  // private handleError(err:any){
  //   let errorMessage : string;
  //   if (err.error instanceof ErrorEvent){
  //     errorMessage = 'An error occured:  ${err.error.message}';

  //   }else{
  //     errorMessage = 'Backend returned code  ${err.status}:  ${err.body.error}';
  //   }



  //   return throwError(errorMessage)
  // }
  hourlyForecast(lat: number,lon:number) {
  return this.http.get(this.hourlyUrl + 'lat=' + lat + '&lon=' + lon + '&units=' + this.units + 
   '&exclude=current,minutely,daily' + '&appid=' + this.apiKey)
  .pipe(
    map((resp)=>{
      return resp;
    })
    // map((resp:any)=>{
    //   return Object.values(resp)
    // })
    );

}
}



