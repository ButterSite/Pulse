import {useState } from "react";
import apiFetcher from "../../assets/apiFetcher";
import { Comments } from "./PostComments";
import { CreatePost } from "./CreatePost";

export const Post = ({post,setPostFilter,setPosts}) => {
    const {authorUsername,authorNames,hashTags,likes,content,_id} = post
    const [likesState, setLikesState] = useState(likes);
    const [likeStatus, setLikeStatus] = useState(``);

    const handleLike = async () => {
      const response = await apiFetcher.handleLike(_id);
      const {success} = response;
      if(!success) {
        return
      };

      const {status} = response;
      if(status === `liked`) {
        setLikesState(prev => prev + 1);
      }else if(status === `unliked`) {
        setLikesState(prev => prev - 1);
      }

      setLikeStatus(status);

    }

    return (
    <>
        <div className="post-container">
            <div className="post-header">
                <div className="post-author">
                <img src="/photos/profile.png"></img>
                <div className="flex-column-container">
                    <p><b>{authorNames}</b></p>
                    <p>@{authorUsername}</p>
                </div>
            </div>
            <button className="follow-button">Follow</button>
            </div>
            <div className="post-content">
              <p>{content}</p>
            </div>
            <div className="flex-row-container hashtags-container">
              {Array.isArray(hashTags) && hashTags.length > 0 && (
                hashTags.map((value, index) => (
                  <p onClick={() => {
                    setPostFilter(
                      {
                        filterName: `hashTags`, filterValue: value
                      })}} 
                    key={index}>{`#${value}`}</p>
                ))
              )}

            </div>
            <div className="likes-container">
              <p><b>{`${likesState} Likes`}</b></p>
            </div>
            <div className="action-container">
              <span className="material-symbols-outlined" onClick={() => {
                setPosts([post]);
                setPostFilter({filterName: `parentId`, filterValue: _id})
              }}> chat</span>
              <span className={`material-symbols-rounded ${likeStatus}` } onClick={() => {handleLike()}}>favorite</span>
            </div>
            <div>

            </div>
        </div>
    </>

    )
}