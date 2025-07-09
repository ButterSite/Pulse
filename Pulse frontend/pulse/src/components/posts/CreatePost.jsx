import { useState } from "react"
import apiFetcher from "../../assets/apiFetcher";

export const CreatePost = ({createdPost}) => {
    const [PostContent, SetPostContent] = useState(``);
    const [PostLength, setPostLength] = useState(0);
    const [hashtags, setHashtags] = useState([]);
    const getHashtags = () => {
    const regex = /#(\w+)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(PostContent)) !== null) {
        matches.push(match[1]);
    }

    setHashtags(matches);
    }

    const publicPost = async () => {
        try {
            if(PostLength > 120 && PostLength > 3) {
                if(PostLength < 3) {
                    // ERROR
                }
                return;
            }
            getHashtags();
            const postData = {
                content: PostContent,
                hashTags: hashtags
            };
            const response = await apiFetcher.publicPost(postData);
            const {success, post} = response;
            createdPost({isCreated: success, post: post});
            SetPostContent(``)
            setPostLength(0);
        }catch(error) {
            throw error
        }


    }


    const handlePostContentChange = (e) => {
        const {value} = e.target;
        const {length} = value;
        setPostLength(length);
        SetPostContent(value);
    }



    return (
        <div className="post-container create-post-container">
            <div className="post-header">
                <div className="post-author">
                <img src="/photos/profile.png"></img>
                <div className="flex-column-container">
                    <p><b>Jan Kowalski</b></p>
                    <p>@jKowalski</p>
                </div>
                </div>
            </div>
            <div className="post-content">
                <textarea value={PostContent} onChange={(e) => handlePostContentChange(e)} placeholder="What's on your mind?"></textarea>
                <p className={`max-chars ${PostLength > 120 ? 'too-many' : 'less'}`}>{PostLength}/120</p>
            </div>
            <div className="post-button-container">
            <button disabled={PostLength > 120} onClick={() => {publicPost()}} className="post-button">Post</button>
            </div>

        </div>
    )
}