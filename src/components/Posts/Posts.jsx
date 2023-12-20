//Displaying many posts on Home Page
import Post from "../Post/Post"
import "./posts.css"
import { v4 as uuidv4 } from 'uuid';

export default function Posts({posts}) {
  return (
    <section className="posts">
      {
        posts.map((post) => {
          return <Post post={post} key={uuidv4()}/>;
        })
      }
    </section>
  )
}
