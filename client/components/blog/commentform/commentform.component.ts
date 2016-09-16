import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'commentform',
    templateUrl: 'commentform.html',
})
export class CommentFormComponent implements OnInit { 
    @Input()
    comment : Comment;

    constructor() { }

    ngOnInit(){
    }
}
