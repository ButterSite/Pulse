import { Document } from 'mongoose';
 




export interface PostInterface {
    authorNames: string;
    authorUsername: string;
    hashTags?: string[];
    content: string;
    comments?: Record<string, any> ;
    postTime: Date,
    likedBy?: string[] 
    likes?: number
    parentId?: string 
}

       

