import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { BlogService } from '../../../services/blog.service'
import { ArticleComponent } from '../article/article.component'

@Component({
    moduleId: module.id,
    selector: 'articlelist',
    templateUrl: 'articlelist.html',
    providers: [BlogService],
})
export class ArticleListComponent implements OnInit { 
    articles : Object;

    constructor(private _http: Http, private _blogService: BlogService) { }

    ngOnInit(){
        this._blogService.getArticles().subscribe((data: any) => this.articles = JSON.parse(data._body),
                                                  error => console.log("There was an error: " + error))
    }
}
