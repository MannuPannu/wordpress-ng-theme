import {Injectable, OnInit} from '@angular/core';
import {Article} from '../classes/Article';
import { BlogService } from '../services/blog.service'
import {Observable } from 'rxjs'

@Injectable()
export class ArticleService implements OnInit {

    public hasLoadedArticles: boolean = false;

    articles: Article[];

    loadItems: number = 3; 
    articleOffset: number = 1; 

    articleSubscription: any;

    constructor(private _blogService: BlogService) {}

    ngOnInit(){
        console.log("Article service started ");
        this.articleSubscription = this._blogService.populateArticles(this.articleOffset, this.loadItems + 1);
        
        this.articleSubscription.subscribe((articles: Article[]) =>{
            this.articles = articles;
            this.hasLoadedArticles = true;
        });
    }

    fetchArticles() {
        return this.articleSubscription; //Return subscription
    }

    getArticles(){
        return this.articles;
    }

    loadMore(){
        this.articleOffset += 1;

        return this._blogService.populateArticles(this.articleOffset, this.loadItems).map((articles: Article[]) => {
            articles.forEach(a => this.articles.push(a));

            return this.articles;
        });
    }
}