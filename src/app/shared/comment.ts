import {User} from '../shared/user';


export class Comment{
    user: User;
    comment: string;
    createdAt: string;

    constructor(user:User, comment: string, createdAt: string){
        this.user = user;
        this.comment = comment;
        this.createdAt = createdAt;
    }
}
