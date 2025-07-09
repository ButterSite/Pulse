import { useEffect, useState } from "react";
import { CreatePost } from "../posts/CreatePost";
import apiFetcher from "../../assets/apiFetcher";
import { useParams } from "react-router-dom";
import { Post } from "../posts/Post";




export const Posts = () => {
    const [createdPost, setCreatedPost] = useState({isCreated: false, post: {}});    
    const [page,setPage] = useState(1);
    const [filteredPage,setFilteredPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [posts, setPosts] = useState([
    ])
    const [postFilter, setPostFilter] = useState(``);



 








      useEffect(() => {
        const getPosts = async () => {
        if(postFilter) return;
        const response = await apiFetcher.getPosts(page,pageSize,``);
        if(response.posts.length === 0) return;
        setPosts((prev) => [...prev, ...response.posts]); 
      };
      getPosts();
    },[page])

      useEffect(() => {
      const getFilteredPosts = async () => {
        if(!postFilter) return;
        const response = await apiFetcher.getPosts(filteredPage,pageSize,postFilter);
        if(response.posts.length === 0) return;
        setPosts((prev) => [...prev, ...response.posts]); 
      }
      getFilteredPosts();
    },[postFilter])



    useEffect(() => {
      const scrollToBottom = async () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      if(scrollTop + windowHeight >= fullHeight - 100) {
          setPage(prev => prev + 1);
      }



    }
      window.addEventListener(`scroll`, scrollToBottom)
      return () => {
        window.removeEventListener(`scroll`,scrollToBottom);
      };
    },[]);


    useEffect(() => {
      if(createdPost.isCreated) {
        setPosts((prev) => [createdPost.post, ...prev]);
        setCreatedPost({isCreated: false, post: {}});

      }
      },[createdPost]);




      const renderContent = () => {
      return (
        <div className="posts-container">
        <CreatePost createdPost={setCreatedPost}></CreatePost>
        <div className="posts-wrapper">
        <div className="search-container">

            {postFilter.filterName ?             
            <p>Posts on: <b>{postFilter.filterValue} </b></p>
            :
            <p><b>See what's happening!</b></p>
            }
        </div>
        {posts.map((value,index) => {
          return (
            <Post setPosts={setPosts} setPostFilter={setPostFilter} key={index} post={value}></Post>
          )
        })}
        </div>
        </div>

    )
    }
    
    return (
        renderContent()
    )
}





