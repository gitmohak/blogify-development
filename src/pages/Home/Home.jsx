import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar"
import Posts from "../../components/Posts/Posts"
import "./home.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    (async () => {

      const {data} = await axios.get("/post" + search);
      setPosts(data.posts);
      
    })();
  }, [search])
  
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