import { ArticleData } from './ArticleData'
import { Comment } from './Comment'
import { Article } from './Article'

/* Responsible for creating view models of the data from the wordpress API */

export class BlogHelper {

    static createArticle(articleWP: any, commentsWP:any[]) : Article {

        var articleData = new ArticleData(articleWP.id, articleWP.title.rendered, articleWP.slug, articleWP.date, "", "", articleWP.content.rendered);

        var article = new Article(articleData, this.createCommentTree(commentsWP))

        return article;
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

    static sortCommentTree(comments: Comment[]){
        var sortedComments = comments.sort((a, b) => a.createdDate - b.createdDate);

        sortedComments.forEach(sc => this.sortCommentTree(sc.childs));
    }

    private static countComments(comments: Comment[], count:number) : number {
        count += comments.length;

        comments.forEach(c => count += this.countComments(c.childs, 0));

        return count;
    }

    static getNumberOfComments(comments: Comment[]) {
        return this.countComments(comments, 0);
    }

    static getNumberOfCommentsString(comments: Comment[]): string{
        var numberOfComments = this.getNumberOfComments(comments); 
        return numberOfComments  + " comment" + ((numberOfComments === 0 || numberOfComments > 1) ? "s" : "");
    }
}