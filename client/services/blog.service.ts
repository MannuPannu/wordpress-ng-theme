import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Article} from '../classes/Article';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BlogService {

    private _wpBase = 'http://localhost/wordpress/wp-json/wp/v2/';

    constructor(private _http: Http) { }

    public populateArticles(pageIndex : number, articles:Article[]) {

        //Gets articles and comments from API then joins them to create Article objects
        Observable.forkJoin([this.getArticlesFromAPI(pageIndex), 
                             this.getCommentsFromAPI(pageIndex)])
                           .subscribe((queue: any) => {
                              var _articles = JSON.parse(queue[0]._body);
                              var comments = JSON.parse(queue[1]._body) as any[];

                              _articles.forEach((a:any) => articles.push(new Article(a, comments.filter(c => c.post === a.id) )) );
                           })
                                                                
    }

    private getArticlesFromAPI(pageIndex: number) {
        return this._http.get(this._wpBase + 'posts/?page=' + pageIndex);
    }

    private getCommentsFromAPI(pageId: number) {
        return this._http.get(this._wpBase + 'comments/?page=' + pageId);
    }
}