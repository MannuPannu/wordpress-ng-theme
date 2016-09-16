export class Comment {
    id: number;
    articleId: number;
    authorName: string;
    authorEmail: string;
    authorUrl: string;
    content: string;
    childs: Comment[];
    createdDate: any;

    constructor(id: number, articleId:number, createdDate:string, authorName:string, authorEmail: string, authorUrl:string, content:string, childs:Comment[]) {
        this.id = id;
        this.articleId = articleId;
        this.createdDate = moment(createdDate);
        this.authorName = authorName;
        this.authorEmail = authorEmail;
        this.authorUrl = authorUrl;
        this.content = content;
        this.childs = childs;
    }
}