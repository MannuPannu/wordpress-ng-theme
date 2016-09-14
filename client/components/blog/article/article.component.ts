import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../services/blog.service'
import {Article} from '../../../classes/Article';
import { Router } from '@angular/router';

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

    constructor(private _blogService: BlogService, private router: Router) { }

    ngOnInit(){
        this.articleDate = this.article.data.createDate.format("YYYY-MM-DD");

        this.numberOfCommentsStr = (this.article.comments.length.toString() 
                                    + " comment" 
                                    + ((this.article.comments.length === 0 || this.article.comments.length > 1) ? "s" : ""));
    }

    gotoDetailedView(): void {
        let link = ['/wordpress/blog/' + this.article.data.slug];
        this.router.navigate(link);
    }
}
