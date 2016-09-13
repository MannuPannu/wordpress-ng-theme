import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { BlogService } from '../../../services/blog.service'
import { ArticleComponent } from '../article/article.component'
import {Article} from '../../../classes/Article';

@Component({
    moduleId: module.id,
    selector: 'articlelist',
    templateUrl: 'articlelist.html',
    providers: [BlogService],
})
export class ArticleListComponent implements OnInit { 
    articles : Article[];
    articleComments: Object;

    constructor(private _http: Http, private _blogService: BlogService) { }

    ngOnInit(){
        this.articles = [];
        this._blogService.populateArticles(1, this.articles);
    }
}
