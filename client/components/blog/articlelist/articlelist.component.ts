import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { BlogService } from '../../../services/blog.service'
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
    articles : Article[];
    articleComments: Object;

    //Paging options
    pageIndex: number = 1;
    articlePerPage: number = 5;

    totalArticleCount: number;

    constructor(private _http: Http, private _blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(){
        this.route.params.subscribe(params => {
            this.articles = [];

            var pageParam = params['page']; 

            if(pageParam){
                this.pageIndex = pageParam;
            }

            this._blogService.getArticleTotalCount().subscribe((totArticleCount:number) => {
                this.totalArticleCount = totArticleCount;
                this._blogService.populateArticles(this.pageIndex, this.articles, this.articlePerPage);

            });

        });
    }

    pageClicked(pageIndex: number){
        this.router.navigate(['/wordpress/blog', {page: pageIndex}]);
    }
}
