import { Comment } from './Comment.ts';
import { ArticleData } from './ArticleData.ts';

export class Article {
    public data: ArticleData;
    public comments: Comment[]

    constructor(data: ArticleData, comments: Comment[]) {
        this.data = data;
        this.comments = comments; 
    }
}