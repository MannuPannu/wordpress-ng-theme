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

    //Paging options
    pageIndex: number = 1;
    articlePerPage: number = 5;

    totalArticleCount: number;

    constructor(private _http: Http, private _blogService: BlogService) { }

    ngOnInit(){
        this.articles = [];

        this._blogService.getArticleTotalCount().subscribe((totArticleCount:number) => {
            this.totalArticleCount = totArticleCount;
            this._blogService.populateArticles(this.pageIndex, this.articles, this.articlePerPage);

        });;
    }

    pageClicked(pageIndex: number){
        this.articles = [];

        this._blogService.getArticleTotalCount().subscribe((totArticleCount:number) => {
            this.totalArticleCount = totArticleCount;
            this._blogService.populateArticles(this.pageIndex, this.articles, this.articlePerPage);

        });;

        this.pageIndex = pageIndex;
    }
}
