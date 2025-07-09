import express ,{Router} from 'express';
import UserController from '../controllers/userController.ts';
import { verifyToken } from '../middlewares/jwtAuthentication.ts';



class UserRoutes {
    private router: Router
    private userController: UserController
    constructor(userController: UserController) {
        this.router = Router()
        this.userController = userController
        this.userRoutes()
    }



    private userRoutes() {
        this.router.post(`/sign-in`,this.userController.signIn);
        this.router.post(`/sign-up`,this.userController.signUp);
        this.router.post(`/create-post`, verifyToken ,this.userController.createPost);
        this.router.get(`/get-posts`, this.userController.getPosts);
        this.router.get(`/handle-like`, verifyToken ,this.userController.giveLike);
    }


    public getRouter(): Router {
        return this.router
    }
}



export default UserRoutes
