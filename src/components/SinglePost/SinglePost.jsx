//Display Full Post with all the information
import "./singlePost.css"
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import parse from 'html-react-parser';
import useSinglePost from "./useSinglePost.jsx";
import { publicFolder } from "../../App.js";
import Spinner from "../Spinner/Spinner.jsx";

export default function SinglePost() {
  const [postState, setPostState] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const myModalRef = useRef(null);

  const { handleDelete, user } = useSinglePost(setIsUpdating, setPostState);
  const handleDeleteStart = () => myModalRef.current.click();

  return (
    <section className="singlePost">
      {postState.username ?

        <>{
          postState.photo && <img src={publicFolder + postState.photo} alt="Post Graphic" />
        }

          <div className="titleSection">
            <div className="title">{postState.title}</div>
            {
              postState.username === user?.username &&
              <div className="actionButtons">
                <button className="btn btn-danger btn-lg mb-3" onClick={handleDeleteStart} disabled={isUpdating}>Delete</button>
              </div>
            }
          </div>

          <div className="subTitles">

            <p className="author"><Link to={`/?user=${postState.username}`} className="link">Author:

              <b>{" " + postState.username[0].toUpperCase() + postState.username.slice(1)}</b></Link></p>

            <p className="time">{new Date(postState.createdAt).toDateString()}</p>
          </div>

          <p className="description">{parse(postState.description)}</p>

          <Modal myModalRef={myModalRef} message={"Do you really want to Delete this Post?"} handleDelete={handleDelete} />
        </> :

        <div className="mt-5">
          <Spinner />
        </div>
      }

    </section>
  )
}