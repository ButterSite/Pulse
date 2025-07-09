import type { UserSignInData, SignUpData } from '../tsInterfaces/postgresInterfaces/userInterfaces.js';
import type { PostInterface } from '../tsInterfaces/mongodbInterfaces/postInterface.ts';
import { response, type Request, type Response } from 'express';
import PostgreSql from '../config/postgresql/postgres.ts';
import type { SignResponse } from '../tsInterfaces/postgresInterfaces/apiResponse.ts';
import PostDataBase from '../config/mongoModels.js/postDataBase.ts';
import type { AuthenticatedRequest } from '../middlewares/jwtAuthentication.ts';
import { stat } from 'fs';

class UserController {
    private postgresql: PostgreSql;
    private postDataBase: PostDataBase;
    constructor(postgresql: PostgreSql, postDataBase: PostDataBase) {
        this.postgresql = postgresql
        this.postDataBase = postDataBase;

    }


    getPosts = async (req: Request<{},{},{}, {page: string, pageSize: string, filterName?: string, filterValue?: string}>, res: Response) => {
        try {
            let byFilter = {};
            if(req.query.filterName && req.query.filterValue) {
                const {filterName, filterValue} = req.query;
                byFilter = {filterName: filterName, filterValue: filterValue};
            }
            const page: number = parseInt(req.query.page as string, 10);
            const pageSize: number = parseInt(req.query.pageSize as string, 10);
            const response = await this.postDataBase.getPosts(page,pageSize, byFilter);
            if(!response) {
                res.status(500).json({success: false, message: `Cannot get posts`});
            }
            res.status(200).json({success: true, posts: response})
            return


        }catch(error) {
            res.status(500).json({success: false, message: `Cannot get posts`})
            console.error(`Error in userController getPosts: ${String(error)}`);
            throw new Error(`Failed in getting posts: ${String(error)}`);
        }
    }



    giveLike = async(req: AuthenticatedRequest, res: Response ) => {
        try {
            const {postId} = req.query;
            const user = req.user;
            if(
                !user || typeof user === `string` || 
                !postId || typeof postId !== `string` 
            ) {
                res.status(401).json({ success: false, message: 'Unauthorized' });
                return
            }
            const username: string = user.username;
            const response = await this.postDataBase.handleLike(postId,username);
            const {success, status,message} = response;
            if(!success) {
                res.status(404).json({success: success,message: message});
                return;
            }

            res.status(200).json({success: success, status: status});
            return;
            

        }catch(error) {
            console.error(`Problem with giving like in userController`);
            throw error
        }
    }

    createPost = async (req: AuthenticatedRequest,res: Response) => {
        try {
            let {postData} = req.body;
            const user = req.user
            if(!user || typeof user === `string`) {
                res.status(401).json({ success: false, message: 'Unauthorized' });
                return
            }
            const username: string = user.username;
            const userData = await this.postgresql.getUserData(username);
            if(!userData) {
                res.status(401).json({success: false, message: `Problem with getting user data`})
                return;
            }
            const {firstname, lastname} = userData;
            postData.authorNames = `${firstname} ${lastname}`;
            postData.authorUsername = username;
            const response = await this.postDataBase.createPost(postData);
            if(!response) {
                res.status(500).json({success: false, message: `Cannot create post`})
                return 
            }


            res.status(200).json({post: response, success: true});
            return;
        }catch(error) {
            res.status(500).json({success: false, message: `Server error`})
            console.error(`Error in userController createPost: ${String(error)}`);
            throw new Error(`Failed to create post:a ${String(error)}`);
        }
 
    }


    signIn = async (req: Request<{},{}, UserSignInData>,res: Response) => {
        try {
            const {username,password} = req.body
            console.log(username, password)
            if(!username || !password) {
                res.status(400).json({success: false, message: `Username or password not provided`});
                return 
            } 
            const {success,message, token, resCode} = await this.postgresql.signInByUsername({username,password});
            if(!success) {
                res.status(resCode).json({success,message});
                return
            }

            res.status(resCode).json({success: success, token: token})
            return 
            
            
        }catch(error: unknown) {
            res.status(500).json({success: false, message: `Server error`})
            console.error(`Error in userController signIn: ${String(error)}`);
            throw new Error(`Failed to sign in: ${String(error)}`);
        }
    }


    signUp = async (req: Request<{},{}, SignUpData>,res: Response) => {
        try {
            const {username,firstName,lastName,password,email} = req.body
            console.log(username)
            if(!username || !password || !firstName || !lastName || !email) {
                res.status(400).json({success: false, message: `Data not provided`});
                return 
            } 
            const {success,message, token} = await this.postgresql.createUser({username,password, firstName, lastName, email});
            if(!success) {
                res.status(401).json({success,message});
                return 
            }

            res.status(200).json({success: success, token: token})
            return 
            
            
        }catch(error: unknown) {
            res.status(500).json({success: false, message: `Server error`})
            console.error(`Error in userController signIn: ${String(error)}`);
            throw new Error(`Failed to sign in: ${String(error)}`);
        }
    }



}


export default UserController