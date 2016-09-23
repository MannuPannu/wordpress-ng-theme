import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {ArticleService} from '../../services/article.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.html'
})
export class AppComponent { 

    constructor(private _articleService: ArticleService){
        _articleService.ngOnInit();
    }
}
