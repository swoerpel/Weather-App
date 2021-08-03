import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherServiceService } from './weather-service.service';
import { WeatherDataComponent } from './weather-data/weather-data.component';
import { AgmCoreModule } from '@agm/core';
import { ForecastDataComponent } from './forecast-data/forecast-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatMenuModule} from '@angular/material/menu';
import { WeatherGraphComponent } from './weather-graph/weather-graph.component';
@NgModule({
  declarations: [
    AppComponent,
    WeatherDataComponent,
    ForecastDataComponent,
    WeatherGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAR4amBT-QNWACEf0lXOuIHnXfOCZdZbEk',
     
      
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    TextFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatMenuModule
    
    
   
    
    

   
 
   
  ],
  providers: [
    WeatherServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

