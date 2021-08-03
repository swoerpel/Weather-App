export interface WeatherApp {
  coord:{
    lat:number,
    lon:number,


  },
  name?: string;
  lon?: string,
  lat?: string;
  timezone?: number;
  visibilty?: number;
  dt?: number;
  id?: number;

  main?: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
  };
  sys?: {
    type: number,
    country: string,
    sunrise: number,
    sunset: number

  };
  weather:[ {
    id: number,
    main: string,
    description: string,
    icon: string

  }];
  wind?: {
    speed: number,
    deg: number
  }




}


