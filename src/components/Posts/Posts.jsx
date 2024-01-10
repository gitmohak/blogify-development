//Displaying many posts on Home Page
import Post from "../Post/Post"
import "./posts.css"
import { v4 as uuidv4 } from 'uuid';
import Spinner from "../Spinner/Spinner"

export default function Posts({posts}) {
  return (
    <section className="posts">

      {posts[0] ?
        posts.map((post) => {
          return <Post post={post} key={uuidv4()}/>;
        }) : 

        <div className="mt-5">
          <Spinner />
        </div>}
        
    </section>
  )
}
