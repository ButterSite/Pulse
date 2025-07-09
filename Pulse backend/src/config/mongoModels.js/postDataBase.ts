import mongoose, { Model, Schema } from 'mongoose';
import type { PostInterface } from '../../tsInterfaces/mongodbInterfaces/postInterface.js';



class PostDataBase {
    private PostModel: typeof Model<PostInterface>

    constructor() {
        const postSchema = new Schema<PostInterface>({
            authorNames: {type: String, required: true},
            authorUsername: { type: String, required: true },
            hashTags: [{ type: String }],
            content: { type: String },
            comments: { type: Schema.Types.Mixed },
            postTime: { type: Date, default: Date.now },
            likedBy: [{ type: String }],
            likes: { type: Number, default: 0, min: 0 },
            parentId: {type: String, required: false}
          });
        this.PostModel = mongoose.model<PostInterface>(`Post`, postSchema);
        this.connectDataBase();
    }


    getPosts = async (page: number, pageSize: number, byFilter?: {filterName?: string, filterValue?: string}) => {
        try {
            let filter: object = {}
            if(byFilter?.filterName && byFilter.filterValue) {
                filter = { [byFilter.filterName]: byFilter.filterValue };
            }else {
              filter = {parentId: {$in: [null, undefined]}}
            };

            const posts: object = await this.PostModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)            

            return posts
        }catch(error) {
            console.error(`Problem with getting posts`);
            throw error
        }
    }

    connectDataBase = async () => {
        try {
            await mongoose.connect(String(process.env.MONGO_URI));
            console.log(`Connected to ${process.env.MONGO_URI}`);
        }catch(error: unknown) {
            console.error(`Failed to connect mongoDB ${error}`)
            throw error
        }

    }


async handleLike(postId: string, likedBy: string): Promise<{ success: boolean; message?: string, status?: string }> {
  try {

    const post = await this.PostModel.findById(postId);

    if (!post) {
      return { success: false, message: `Post not found` };
    }

    const alreadyLiked = post.likedBy.includes(likedBy);
    let status;
    
    if (alreadyLiked) {
      await this.PostModel.findByIdAndUpdate(postId, {
        $pull: { likedBy: likedBy },
        $inc: { likes: -1 }
      });
      status = `unliked`
    } else {
      await this.PostModel.findByIdAndUpdate(postId, {
        $push: { likedBy: likedBy },
        $inc: { likes: 1 }
      });
      status = `liked`
    }

    return { success: true, status: status };
  } catch (error) {
    console.error(`Failed to handle like`, error);
    throw error;
  }
}


 
    async createPost(postData: PostInterface): Promise<PostInterface> {
        try {
            postData.likes = 0;
            postData.comments = {};
            postData.likedBy = [];
            const post = new this.PostModel(postData)
            return await post.save();
            
        }catch(error: unknown) {
            console.error(`Problem with creating post`)
            throw error
        }

        

    }
}

export default PostDataBase;