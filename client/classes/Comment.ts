export class Comment {
    id: number;
    parentId: number;
    articleId: number;
    authorName: string;
    authorUrl: string;
    content: string;

    constructor() {
    }
}