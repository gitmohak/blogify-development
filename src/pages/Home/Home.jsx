import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar"
import Posts from "../../components/Posts/Posts"
import "./home.css"
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/post", {
        method: "GET", 
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });

      const data =  await response.json();
      setPosts(data.posts);
    })();
  }, [])
  
  return (
    <>
    <Header/>
    <section className="home">
      <Posts posts={posts}/>
      <Sidebar />
    </section>
    </>
  )
}
