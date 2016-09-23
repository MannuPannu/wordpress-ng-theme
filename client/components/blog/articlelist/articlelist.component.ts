import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { BlogService } from '../../../services/blog.service'
import { ArticleService } from '../../../services/article.service'
import { ArticleComponent } from '../article/article.component'
import {Article} from '../../../classes/Article';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'articlelist',
    templateUrl: 'articlelist.html',
    providers: [BlogService],
})
export class ArticleListComponent implements OnInit { 
    articles : Article[] = [];
    articleComments: Object;

    loading: boolean = false;

    showNoHitsMessage: boolean = false;

    constructor(private _http: Http, private _blogService: BlogService, private route: ActivatedRoute, private router: Router,
    private _articleService: ArticleService) { }

    ngOnInit(){
        this.route.params.subscribe(params => {
            if(this._articleService.hasLoadedArticles){
                this.articles = this._articleService.getArticles();
            }
            else{
                this.loading = true;
                this._articleService.fetchArticles().subscribe((articles: Article[]) => {
                  this.articles = articles;
                  this.loading = false;
                })        
            }
        });
    }

    loadMore(){
        this.loading = true;
        this._articleService.loadMore().subscribe((articles: Article[]) => {

            if(this.articles == articles){
                this.showNoHitsMessage = true;
            }

            this.articles = articles;
            this.loading = false;
        });
    }
}
