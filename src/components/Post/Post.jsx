//Component for displaying a User's Post
import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const publicFolder = `${process.env.REACT_APP_SERVER}/uploaded-images/`;

  return (
    <section className="post">
      <Link to={`/post/${post._id}`} className="link">
        {
          post.photo && <img src={publicFolder + post.photo} />
        }

        <div className="postInfo">
          <div className="postTitle">
            {post.title}
          </div>

          <div className="postTime">{new Date(post.createdAt).toDateString()}</div>
        </div>

        <p className="postDesc">{post.description}</p>
      </Link>
    </section>
  )
}
