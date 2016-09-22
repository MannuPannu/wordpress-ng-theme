import { ArticleData } from './ArticleData'
import { Comment } from './Comment'
import { CommentCookieModel } from './CommentCookieModel'
import { Article } from './Article'
import {CookieService, CookieOptionsArgs} from 'angular2-cookie/core';

/* Responsible for creating view models of the data from the wordpress API */

export class BlogHelper {

    static createArticle(articleWP: any, commentsWP:any[]) : Article {

        var articleData = new ArticleData(articleWP.id, articleWP.title.rendered, articleWP.slug, articleWP.date, "", "", articleWP.content.rendered);

        var article = new Article(articleData, this.createCommentTree(commentsWP))

        return article;
    }

    static createComments(commentsWP: any[]) : Comment[] {
        return this.createCommentTree(commentsWP);
    }

    static createCommentTree(comments : any){

        var tree = this.createTree(comments, 0, []);

        return tree;
    }

    static createTree(comments: any, parent: number, tree: any) {

        var childs = comments.filter((c : any) => c.parent === parent);

        childs.forEach((c:any) => {
            var grandChilds = comments.filter((gc:any) => gc.parent === c.id);

            tree.push(new Comment(c.id, c.post, c.date , c.author_name, c.author_email, c.author_url, c.content.rendered, this.createTree(comments, c.id, [])));
        });

        return tree;
    }

    static addCookieCommentToCommentTree(comments: Comment[], comment: CommentCookieModel){

        if(comment.parentId <= 0){
            comments.push(new Comment(-1, comment.articleId, comment.createdDate, comment.authorName, "", "", "You comment is waiting moderation", []));
            return;
        }

        comments.forEach(c => {
            if(c.id == comment.parentId){
                c.childs.push(new Comment(-1, comment.articleId, comment.createdDate, comment.authorName, "", "", "You comment is waiting moderation", []));
                return;
            }
            else {
                this.addCookieCommentToCommentTree(c.childs, comment);
            }
        })
    }

    static getCommentIds(comments : Comment[]) : number[]{
        var commentIds:number[] = [];

        comments.forEach(c => {
            commentIds.push(c.id);

            var childCommentIds = this.getCommentIds(c.childs);

            commentIds = commentIds.concat(childCommentIds);
        });

        return commentIds;
    }

    static addCommentToCookie(commentObj: any, commentParentId: number, cookieService: CookieService){
        var commentCookie = this.createCommentCookie(commentObj, commentParentId, cookieService);

        var commentsCookieModels = cookieService.getObject("commentCookie") as CommentCookieModel[];

        if(commentsCookieModels){ //Cookie exists
            commentsCookieModels.push(commentCookie);

           var options:CookieOptionsArgs = {"expires" : moment().add(1, 'year').toDate()};
           cookieService.putObject("commentCookie", commentsCookieModels, options)

        }else{ //Create new commentCokie

            commentsCookieModels = [];
            commentsCookieModels.push(commentCookie);

            var options:CookieOptionsArgs = {"expires": moment().add(1, 'year').toDate()};

            cookieService.putObject("commentCookie", commentsCookieModels, options);
        }
    }

    static getCommentsFromCookie(cookieService: CookieService, articleId: number) : CommentCookieModel[] {
        var commentsCookieModels = cookieService.getObject("commentCookie") as CommentCookieModel[];

        if(commentsCookieModels){
            return commentsCookieModels.filter(x => x.articleId == articleId);
        }
        else {
            return [];
        }
    }

    static removeCommentsFromCookie(commentIds: number[], cookieService: CookieService){

        var commentsCookieModels = cookieService.getObject("commentCookie") as CommentCookieModel[];
        if(commentsCookieModels){

            commentsCookieModels = commentsCookieModels.filter(x => !commentIds.some(cId => cId == x.id));

            var options:CookieOptionsArgs = {"expires": moment().add(1, 'year').toDate()};

            cookieService.putObject("commentCookie", commentsCookieModels, options);
        }
    }

    static createCommentCookie(commentObj: any, commentParentId: number, cookieService: CookieService){
        var obj = JSON.parse(commentObj._body); 
        var comment = new CommentCookieModel(obj.id, commentParentId, obj.post, obj.author_name, obj.date); 

        return comment;
    }
    
    static sortCommentTree(comments: Comment[]){
        var sortedComments = comments.sort((a, b) => a.createdDate - b.createdDate);

        sortedComments.forEach(sc => this.sortCommentTree(sc.childs));
    }

    private static countComments(comments: Comment[], count:number) : number {
        count += comments.length;

        comments.forEach(c => count += this.countComments(c.childs, 0));

        return count;
    }

    public static closeAllReplyFormsExceptId(comments: Comment[], commentId: number){
        comments.forEach(c => { 
            if(c.id !== commentId) { 
                c.replyFormIsOpened = false; 
            }
             this.closeAllReplyFormsExceptId(c.childs, commentId);
        })
    }

    static getNumberOfComments(comments: Comment[]) {
        return this.countComments(comments, 0);
    }

    static getNumberOfCommentsString(comments: Comment[]): string{
        var numberOfComments = this.getNumberOfComments(comments); 

        if(numberOfComments > 0){
           return numberOfComments + " comments"; 
        }
        else {
            return "Comment this post!"
        }
    }
}