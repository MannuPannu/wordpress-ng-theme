import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from '../components/app/app.component';
import { ArticleComponent }  from '../components/blog/article/article.component';
import { CommentListComponent }  from '../components/blog/commentlist/commentlist.component';
import { CommentFormComponent }  from '../components/blog/commentform/commentform.component';
import { PagerComponent }  from '../components/blog/pager/pager.component';
import { LoaderComponent }  from '../components/utils/loader/loader.component';
import { MenuBarComponent }  from '../components/menubar/menubar.component';
import { ArticleService }  from '../services/article.service';
import { BlogService }  from '../services/blog.service';

import { routing, routedComponents } from '../app.routing';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing , FormsModule],
  declarations: [ AppComponent, routedComponents, ArticleComponent, CommentListComponent, CommentFormComponent, PagerComponent,
              MenuBarComponent, LoaderComponent ],
  providers: [CookieService, ArticleService, BlogService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
