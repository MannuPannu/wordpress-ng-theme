import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'article-component',
    templateUrl: 'article.html',
})
export class ArticleComponent { 
    @Input()
    article : Object; //todo: Create class for this
    
    constructor() { }
}
