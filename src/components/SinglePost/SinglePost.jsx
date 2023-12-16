import { useLocation } from "react-router-dom"
import "./singlePost.css"
import { useEffect, useState } from "react";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.slice(6);
  const [postState, setPostState] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(`/post/${postId}`, {
        method: "GET", 
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });

      const data =  await response.json();
      setPostState(data.post);
    })();
  }, [postId])
  

  return (
    <section className="singlePost">
      {
        postState.photo && <img src={postState.photo} />
      }
      
      <div className="titleSection">
        <div className="title">{postState.title}</div>
        <div className="actionButtons">
          <i className="fa-regular fa-pen-to-square"></i>
          <i className="fa-regular fa-trash-can"></i>
        </div>
      </div>

      <div className="subTitles">
        <p className="author">Author: <b>{postState.username}</b></p>
        <p className="time">{new Date(postState.createdAt).toDateString()}</p>
      </div>

      <p className="description">{postState.description}</p>
    </section>
  )
}
