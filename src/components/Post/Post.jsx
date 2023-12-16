import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <section className="post">
      {
        post.photo && <img src={post.photo} />
      }

      <div className="postInfo">
        <div className="postCats">
          {
            post.categories.map((category) => {
              <span className="postCat">{category}</span>
            })
          }
        </div>

        <div className="postTitle">
          <Link to={`/post/${post._id}`} className="link">{post.title}</Link>
        </div>

        <div className="postTime">{new Date(post.createdAt).toDateString()}</div>
      </div>

      <p className="postDesc">{post.description}</p>
    </section>
  )
}
