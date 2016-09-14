import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'commentlist',
    templateUrl: 'commentlist.html',
})
export class CommentListComponent implements OnInit { 
    @Input()
    comments : Comment[];
    @Input()
    hasParent : boolean;

    constructor() { }

    ngOnInit(){
    }
}
