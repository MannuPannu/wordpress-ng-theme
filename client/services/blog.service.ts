import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class BlogService {

    private _wpBase = 'http://localhost/wordpress/wp-json/wp/v2/';

    constructor(private _http: Http) { }

    getArticles() {
        return this._http.get(this._wpBase + 'posts/?page=1');
    }
}