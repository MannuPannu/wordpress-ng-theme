import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../services/blog.service'
import {Article} from '../../../classes/Article';

@Component({
    moduleId: module.id,
    selector: 'article-component',
    templateUrl: 'article.html',
})
export class ArticleComponent implements OnInit{ 
    @Input()
    article : Article; //todo: Create class for this
    articleDate: string;
    numberOfCommentsStr: string;

    constructor(private _blogService: BlogService) { }

    ngOnInit(){
        
        this.articleDate = moment(this.article.data.date).format("YYYY-MM-DD");

        this.numberOfCommentsStr = (this.article.comments.length.toString() 
                                    + " comment" 
                                    + ((this.article.comments.length === 0 || this.article.comments.length > 1) ? "s" : ""));
    }
}
