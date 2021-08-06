export interface Forecast {
  clouds?: {
    all: number;
  };
  dt: string;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    pod: string;
  };

  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];

  wind?: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility?: number;

  pop?: number;

  rain?: {
    h3?: number;
  };
}
