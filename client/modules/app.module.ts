import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from '../components/app/app.component';
import { ArticleComponent }  from '../components/blog/article/article.component';
import { CommentListComponent }  from '../components/blog/commentlist/commentlist.component';

import { routing, routedComponents } from '../app.routing';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing ],
  declarations: [ AppComponent, routedComponents, ArticleComponent, CommentListComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
