import mongoose from 'mongoose';



class PostDataBase {
    constructor() {
        this.postSchema = new mongoose.Schema({
            author: {type: String, required: true},
            hashTags: {type: [String]},
            content: {type: String},
            comments: {type: Object},
            postTime: {type: Date, default: Date.now()},
            likedBy: {type: [String]},
            likes: {type: Number, default: 0, MinKey: 0}

        })
        this.Post = new mongoose.model(`Post`, this.postSchema);
        this.connectDataBase();
    }


    connectDataBase = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log(`Connected to ${process.env.MONGO_URI}`);
        }catch(error) {
            throw error
        }

    }


    createPost = (postData) => {

    }
}

export default new PostDataBase();