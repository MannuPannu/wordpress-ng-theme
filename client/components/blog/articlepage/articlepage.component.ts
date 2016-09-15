import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../../../classes/Article';
import { BlogService } from '../../../services/blog.service'
import { ActivatedRoute, Params } from '@angular/router';
import {BlogHelper} from '../../../classes/BlogHelper';

@Component({
    moduleId: module.id,
    selector: 'article-page',
    templateUrl: 'articlepage.html',
    providers: [BlogService],
})
export class ArticlePageComponent implements OnInit{ 
    article: Article;
    articleDate: string;
    numberOfCommentsStr: string;
 
    constructor(private _blogService: BlogService, private route: ActivatedRoute) { }

    ngOnInit(){
        this.article = null; 
        this.route.params.subscribe(params => {
            let slug = params['slug']; 
            this._blogService.getArticleBySlug(slug).subscribe((article: Article) => {
                this.article = article;

                BlogHelper.sortCommentTree(article.comments);

                this.articleDate = moment(this.article.data.createDate).format("YYYY-MM-DD");

                this.numberOfCommentsStr = BlogHelper.getNumberOfCommentsString(this.article.comments);
            });
        });
    }

    ngAfterViewChecked(){
        this.route.fragment.subscribe(f => {
            if(f && f === "comments"){
                // Workaround to scroll down to comment section! Angular has not fixed this yet.
                const element:any = document.querySelector("#" + f);
                debugger;
                if(element){
                    element.scrollIntoView(element);
                }
            }
        });
    }

    gotoComments(){
        debugger;
        const element:any = document.querySelector("#" + "comments");
        if(element){
            element.scrollIntoView(element);
        }
    }

    getCommentDate(dateStr:string) {
        return moment(dateStr).format("YYYY-MM-DD HH:mm");
    }
}
