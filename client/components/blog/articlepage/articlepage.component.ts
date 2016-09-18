import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../../../classes/Article';
import { BlogService } from '../../../services/blog.service'
import { ActivatedRoute, Params } from '@angular/router';
import {BlogHelper} from '../../../classes/BlogHelper';
import { Comment } from '../../../classes/Comment';

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
    newComment: Comment;

    hasScrolled: boolean;
    replyFormIsVisible: boolean;
 
    constructor(private _blogService: BlogService, private route: ActivatedRoute) { }

    ngOnInit(){
        this.replyFormIsVisible = false;
        this.hasScrolled = false;
        this.article = null; 
        this.route.params.subscribe(params => {
            let slug = params['slug']; 
            this._blogService.getArticleBySlug(slug).subscribe((article: Article) => {
                this.article = article;

                BlogHelper.sortCommentTree(article.comments);

                this.articleDate = moment(this.article.data.createDate).format("YYYY-MM-DD");

                this.numberOfCommentsStr = BlogHelper.getNumberOfCommentsString(this.article.comments);
                this.newComment = new Comment(-1, this.article.data.id, "", "", "", "", "", []);
            });
        });
    }

    ngAfterViewChecked(){
        this.route.fragment.subscribe(f => {
            if(f && f === "comments"){
                // Workaround to scroll down to comment section! Angular has not fixed this yet.
                const element:any = document.querySelector("#" + f);
                if(element && !this.hasScrolled){
                    element.scrollIntoView(element);
                    this.hasScrolled = true;
                }
            }
        });
    }

    gotoComments(){
        const element:any = document.querySelector("#" + "comments");
        if(element){
            element.scrollIntoView(element);
            this.hasScrolled = true;
        }
    }

    getCommentDate(dateStr:string) {
        return moment(dateStr).format("YYYY-MM-DD HH:mm");
    }

    replyFormVisibleToggle(event: any){

        if(event.isVisible){
            BlogHelper.closeAllReplyFormsExceptId(this.article.comments, event.commentId);
            this.replyFormIsVisible = true;
        }
        else{
            this.replyFormIsVisible = false;
        }
    }
}
