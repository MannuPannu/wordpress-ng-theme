export class BlogHelper {

    constructor() {
    }

    createCommentTree(comments : any){
        // var comments = [{id: 1, content: "hej", parent: 0},
        //         {id: 32, content: "svar till hej", parent: 1},
        //         {id: 42, content: "Bra sida!", parent: 0},
        //         {id: 31, content: "tackar!", parent: 68},
        //         {id: 12, content: "Ingen orsak!", parent: 31},
        //         {id: 68, content: "bra blog", parent: 0},
        //         {id: 8, content: "Inga problem här heller", parent: 31},
        //         {id: 10, content: "Grym blog", parent: 0}
        //         ];

        var tree = this.createTree(comments, 0, []);

        return tree;
    }

    createTree(comments: any, parent: number, tree: any) {

        var childs = comments.filter((c : any) => c.parent === parent);

        childs.forEach((c:any) => {
            var grandChilds = comments.filter((gc:any) => gc.parent === c.id);

            tree.push({
                        id: c.id, 
                        content: c.content, 
                        parent: parent, 
                        childs: this.createTree(comments, c.id, [])
                    });
        });

        return tree;
    }
}