import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../services/blog.service'
import {Article} from '../../../classes/Article';
import { Router,NavigationExtras } from '@angular/router';
import {BlogHelper} from '../../../classes/BlogHelper';

@Component({
    moduleId: module.id,
    selector: 'article-component',
    templateUrl: 'article.html',
})
export class ArticleComponent implements OnInit{ 
    @Input()
    article : Article; 
    articleDate: string;
    numberOfCommentsStr: string;
    numberOfComments: number;

    constructor(private _blogService: BlogService, private router: Router) { }

    ngOnInit(){
        this.articleDate = this.article.data.createDate.format("YYYY-MM-DD");

        this.numberOfComments = BlogHelper.getNumberOfComments(this.article.comments);
        
        this.numberOfCommentsStr = BlogHelper.getNumberOfCommentsString(this.article.comments);
    }

    gotoDetailedView(toComments:boolean): void {
        var link = ['/wordpress/blog/' + this.article.data.slug];

        if(toComments){
            let navigationExtras: NavigationExtras = {
                fragment: 'comments'
            };
            this.router.navigate(link, navigationExtras);
        }
        else{
            this.router.navigate(link);
        }
    }
}
