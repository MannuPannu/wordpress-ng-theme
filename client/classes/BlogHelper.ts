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

            tree.push(new Comment(c.id, c.post, c.date , c.author_name, c.author_url, c.content.rendered, this.createTree(comments, c.id, [])));
        });

        return tree;
    }
}