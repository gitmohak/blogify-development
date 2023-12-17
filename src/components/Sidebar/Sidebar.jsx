import { useEffect, useState } from "react"
import "./sidebar.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function Sidebar() {
  const [categoriesState, setCategoriesState] = useState([]);

  useEffect(() => {
    (async () => {

      const {data} = await axios.get("/category");
      setCategoriesState(data.categories);
      
    })();
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarTitle">ABOUT ME</div>
        <img src="/images/about.jpg" alt="About Me" />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id, qui exercitationem possimus ea architecto? Voluptates, similique.</p>
      </div>

      <div className="sidebarHeader">
        <div className="sidebarTitle">CATEGORIES</div>
        <div className="categories">
          <ul>
            {
              categoriesState.slice(0, 3).map((element) => {
                return <li key={uuidv4()}>
                  <Link to={`/?category=${element.name}`} className="link">{element.name}</Link>
                  </li>
              })
            }
          </ul>
          <ul>
            {
              categoriesState.slice(3).map((element) => {
                return <li key={uuidv4()}>
                  <Link to={`/?category=${element.name}`} className="link">{element.name}</Link>
                  </li>
              })
            }
          </ul>
        </div>
      </div>

      <div className="sidebarHeader">
        <div className="sidebarTitle">FOLLOW ME</div>
        <div className="social">
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-twitter"></i>
          <i className="fa-brands fa-square-youtube"></i>
          <i className="fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </aside>
  )
}
