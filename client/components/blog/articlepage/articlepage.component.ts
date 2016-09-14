import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../../../classes/Article';
import { BlogService } from '../../../services/blog.service'
import { ActivatedRoute, Params } from '@angular/router';
import {BlogHelper} from '../../../classes/BlogHelper';

@Component({
    moduleId: module.id,
    selector: 'article-page',
    templateUrl: 'articlepage.html',
    providers: [BlogService]
})
export class ArticlePageComponent implements OnInit{ 
    article: Article;
    articleDate: string;
    numberOfCommentsStr: string;

    constructor(private _blogService: BlogService, private route: ActivatedRoute) { }

    ngOnInit(){
        this.article = null; 
        var sub = this.route.params.subscribe(params => {
            let slug = params['slug']; 
            this._blogService.getArticleBySlug(slug).subscribe((article: Article) => {
                this.article = article;

                BlogHelper.sortCommentTree(article.comments);

                this.articleDate = moment(this.article.data.createDate).format("YYYY-MM-DD");

                this.numberOfCommentsStr = (this.article.comments.length.toString() 
                                    + " comment" 
                                    + ((this.article.comments.length === 0 || this.article.comments.length > 1) ? "s" : ""));
            });
        });
    }

    getCommentDate(dateStr:string) {
        return moment(dateStr).format("YYYY-MM-DD HH:mm");
    }
}
