import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from '../components/app/app.component';

import { routing, routedComponents } from '../app.routing';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing ],
  declarations: [ AppComponent, routedComponents ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
