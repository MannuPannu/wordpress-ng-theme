import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
// import {ArticlesComponent} from './articles.component';

@Component({
    selector: 'my-app',
    templateUrl: 'components/app/app.html'
})
export class AppComponent implements OnInit { 
    articles : Object;

    constructor(private _http: Http) { }

    private _wpBase = 'http://localhost/wordpress/wp-json/wp/v2/';

    ngOnInit(){
       this.getArticles().subscribe((data: any) => {
                this.articles = JSON.parse(data._body);
            },
            error => console.error('oops it did not work')); 
    }

    getArticles() {
        return this._http.get(this._wpBase + 'posts/?page=1');
    }
}
