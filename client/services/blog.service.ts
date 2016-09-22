import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Article} from '../classes/Article';
import {Comment} from '../classes/Comment';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {BlogHelper} from '../classes/BlogHelper';

@Injectable()
export class BlogService {

    private _wpBase = 'http://localhost/wordpress/wp-json/wp/v2/';

    constructor(private _http: Http) { }

    public populateArticles(pageIndex : number, articles:Article[]) {
        //Gets articles and comments from API then joins them to create Article objects
        Observable.forkJoin([this.getArticlesByPageFromAPI(pageIndex), 
                             this.getCommentsByPageFromAPI(pageIndex)])
                           .subscribe((queue: any) => {
                              var _articles = JSON.parse(queue[0]._body);
                              var comments = JSON.parse(queue[1]._body) as any[];

                              _articles.forEach((a:any) => articles.push(BlogHelper.createArticle(a, comments.filter(c => c.post === a.id) )) );
                           })
    }

    public getArticleBySlug(slug: string) {
        
        return this.getArticleBySlugFromAPI(slug).map((r:any) => {
            var _article = JSON.parse(r._body)[0];
            return BlogHelper.createArticle(_article, []);
        });
    }

    public getCommentsByArticleId(articleId: number){
        return this.getCommentsByArticleFromAPI(articleId).map((r:any) => {
            var comments = JSON.parse(r._body) as any[];

            return BlogHelper.createComments(comments);
        });
    }

    public sendComment(comment: Comment) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('author_name', comment.authorName);
        params.set('content', comment.content);
        params.set('author_url', comment.authorUrl);
        params.set('author_email', comment.authorEmail);
        params.set('post', comment.articleId.toString());

        return this._http.post(this._wpBase + 'comments/', params);
    }
    
    public sendCommentWithParent(comment: Comment, parentId: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('author_name', comment.authorName);
        params.set('content', comment.content);
        params.set('author_url', comment.authorUrl);
        params.set('author_email', comment.authorEmail);
        params.set('post', comment.articleId.toString());
        params.set('parent', parentId.toString());

        return this._http.post(this._wpBase + 'comments/', params);
    }

    private getArticlesByPageFromAPI(pageIndex: number) {
        return this._http.get(this._wpBase + 'posts/?page=' + pageIndex);
    }

    private getCommentsByPageFromAPI(pageId: number) {
        return this._http.get(this._wpBase + 'comments/?page=' + pageId + "&per_page=20");
    }

    private getArticleBySlugFromAPI(slug: string): Observable<any> {
        return this._http.get(this._wpBase + 'posts/?slug=' + slug);
    }

    private getCommentsByArticleFromAPI(articleId: number) {
        return this._http.get(this._wpBase + 'comments/?post=' + articleId + "&per_page=20");
    }
}