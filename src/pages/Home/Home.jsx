import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar"
import Posts from "../../components/Posts/Posts"
import "./home.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    (async () => {

      try {
        const { data } = await axios.get("/post" + search);
        setPosts(data.posts);

      } catch (error) {
        toast.error('Something Went Wrong!', {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        window.console.clear();
      }
    })();
  }, [search])

  return (
    <>
      <Header />
      <section className="home">
        <Posts posts={posts} />
        <Sidebar />
      </section>
    </>
  )
}
