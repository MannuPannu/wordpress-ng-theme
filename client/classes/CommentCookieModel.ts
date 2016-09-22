export class CommentCookieModel {

    constructor(public id: number,
                public parentId: number, 
                public articleId: number, 
                public authorName: string, 
                public createdDate: any) {}
}