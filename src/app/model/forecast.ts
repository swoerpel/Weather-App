export interface Forecast {
  // cod?: number;
  // message?: string;
  // cnt?: number;
  // list: [
  //   {
    clouds?: {
      all: number;
    },
     dt: string,
     dt_txt: string,
    main: {
      
      feels_like: number,
      grnd_level: number,
      humidity: number,
      pressure: number,
      sea_level: number,
      temp: number,
      temp_kf: number,
      temp_min: number,
      temp_max: number
     
     
     
      
     
    },
    sys:{
      pod:string,

    },

    weather: [
      {
        description:string,
        icon:string,
        id:number,
        main:string
       
      }
    ],

    

    wind?: {
      speed: number,
      deg: number,
      gust: number,

      visibility?: number,

      pop?: number,

      rain?: {
        h: number,
      },

      sys?: {
        pod: string;
      },

     
    }
  
  //   },
  // ]
  // city?: {
  //   id: number;
  //   name: string;
  //   coord: {
  //     lat: number;
  //     lon: number;
  //   };
  //   country: string;
  //   timezone: number;
  //   sunrise: number;
  //   sunset: number;
  // };


////////// ketu eshte daily dhe hourly/////////////

//lat: number,
  // lon: number,
  // timezone: string,
  // timezone_offset: number,

  // hourly: [
  //   {
  //     dt: string,
  //     temp: number,
  //     feels_like: number,
  //     pressure: number,
  //     humidity: number,
  //     dew_point: number,
  //     uvi: number,
  //     clouds: number,
  //     visibility: number,
  //     wind_speed: number,
  //     wind_deg: number,
  //     wind_gust: number,
  //     weather: [
  //       {
  //         id: number,
  //         main: string,
  //         description: string,
  //         icon:string
  //       },
  //     ],
  //     pop: number
  //   },
  // ],
  
  
  //   daily: [
  //   {
  //     dt: number,
  //     sunrise: number,
  //     sunset: number,
  //     moonrise: number,
  //     moonset: number,
  //     moon_phase: number,
  //     temp: {
  //       day: number,
  //       min: number,
  //       max: number,
  //       night: number,
  //       eve: number,
  //       morn: number
  //     },
  //     feels_like: {
  //       day: number,
  //       night: number,
  //       eve: number,
  //       morn: number
  //     },
  //     pressure: number,
  //     humidity: number,
  //     dew_point: number,
  //     wind_speed: number,
  //     wind_deg: number,
  //     weather: [
  //       {
  //         id: number,
  //         main: string,
  //         description: string,
  //         icon:string
  //       }
  //     ],
  //     clouds:number,
  //     pop: number,
  //     rain: number,
  //     uvi: number
  //   },
  //   ],
   
  //   alerts: [
  //   {
  //     sender_name:string,
  //     event: string,
  //     start: number,
  //     end: number,
  //     description:string
  //     tags: [
  //      string
  //       ]
  //   },
   
  // ]


}
