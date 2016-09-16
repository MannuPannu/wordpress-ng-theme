import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from '../components/app/app.component';
import { ArticleComponent }  from '../components/blog/article/article.component';
import { CommentListComponent }  from '../components/blog/commentlist/commentlist.component';
import { CommentFormComponent }  from '../components/blog/commentform/commentform.component';

import { routing, routedComponents } from '../app.routing';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing , FormsModule],
  declarations: [ AppComponent, routedComponents, ArticleComponent, CommentListComponent, CommentFormComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
