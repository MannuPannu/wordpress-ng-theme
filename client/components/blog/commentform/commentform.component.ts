import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../classes/Comment';

@Component({
    moduleId: module.id,
    selector: 'commentform',
    templateUrl: 'commentform.html',
})
export class CommentFormComponent implements OnInit { 
    comment : Comment;
 
    constructor() { }

    ngOnInit(){
        this.comment = new Comment(-1, -1, "", "", "", "", "", []);
    }

    get diagnostic() { return JSON.stringify(this.comment); }

    onSubmit(){
        console.log("Submitted! ", this.comment);
    }
}
