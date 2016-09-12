import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../services/blog.service'

@Component({
    moduleId: module.id,
    selector: 'article-component',
    templateUrl: 'article.html',
})
export class ArticleComponent implements OnInit{ 
    @Input()
    article : any; //todo: Create class for this
    articleDate: string;
    numberOfComments: number;

    constructor(private _blogService: BlogService) { }

    ngOnInit(){
        this.articleDate = moment(this.article.date).format("YYYY-MM-DD");

        // this._blogService.getComments(this.article.id).subscribe((data : any) => console.log(data));
    }
}
