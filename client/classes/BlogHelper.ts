import { ArticleData } from './ArticleData'
import { Comment } from './Comment'
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

    static createCommentCookie(commentObj: any, cookieService: CookieService){
        var obj = JSON.parse(commentObj._body); 
        var comment = new Comment(obj.id, obj.post, obj.date, obj.author_name, "", obj.author_url, obj.content.rendered, []);

        var options:CookieOptionsArgs = {"expires" : moment().add(1, 'year').toDate()};

        cookieService.putObject("commentCookie", comment, options);
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
        return numberOfComments  + " comment" + ((numberOfComments === 0 || numberOfComments > 1) ? "s" : "");
    }
}