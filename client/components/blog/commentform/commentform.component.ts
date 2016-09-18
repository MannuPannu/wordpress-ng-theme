import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../classes/Comment';
import { BlogService } from '../../../services/blog.service'

@Component({
    moduleId: module.id,
    selector: 'commentform',
    templateUrl: 'commentform.html',
})
export class CommentFormComponent implements OnInit { 
    @Input()
    comment : Comment;

    @Input()
    parentId: number = -1;

    @Output()
    commentSent = new EventEmitter();

    submitDisabled: boolean;
    successMessageVisible: boolean;
 
    constructor(private _blogService: BlogService) { }

    ngOnInit(){
        this.submitDisabled = false;
        this.successMessageVisible = false;
    }

    get diagnostic() { return JSON.stringify(this.comment); }

    onSubmit(){
        this.submitDisabled = true;

        if(this.parentId > 0)
        {
             this._blogService.sendCommentWithParent(this.comment, this.parentId).subscribe(r => {
                this.clearComment();
                this.showSuccessMessage();
            }, error => {
                console.log("An error occured while sending the comment", error.json()); 
            });
        }
        else {
            this._blogService.sendComment(this.comment).subscribe(r => {
                this.clearComment();
                this.showSuccessMessage();
            }, error => {
                console.log("An error occured while sending the comment", error.json()); 
            });
        }
    }

    clearComment() {
        this.comment.content = "";
    }

    showSuccessMessage(){
        this.successMessageVisible = true;
        setTimeout(() => {
           this.successMessageVisible = false; 
            this.submitDisabled = false;
            this.commentSent.emit(true);
        }
        , 2000);
    }
}
