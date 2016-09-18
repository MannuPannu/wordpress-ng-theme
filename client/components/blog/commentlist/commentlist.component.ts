import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../classes/Comment';
import { BlogService } from '../../../services/blog.service'

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
    @Output()
    replyFormVisibleToggle = new EventEmitter();

    articleId: number;
    replyComment: Comment;

    constructor(private _blogService: BlogService) { }

    ngOnInit(){
        
        var comment = this.comments[0];
        if(comment){
            this.articleId = comment.articleId;
        }

        this.replyComment = new Comment(-1, this.articleId, "", "", "", "", "", []);
    }

    toggleReplyToCommentForm(comment: Comment){
        comment.replyFormIsOpened = !comment.replyFormIsOpened;

        //Close other comments replyforms
        this.replyFormVisibleToggle.emit({commentId: comment.id, isVisible: comment.replyFormIsOpened});
   }
}
