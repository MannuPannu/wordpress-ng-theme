import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from '../components/app/app.component';
import { ArticleComponent }  from '../components/blog/article/article.component';

import { routing, routedComponents } from '../app.routing';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing ],
  declarations: [ AppComponent, routedComponents, ArticleComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
