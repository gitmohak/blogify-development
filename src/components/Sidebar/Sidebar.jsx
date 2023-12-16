import "./sidebar.css"

export default function Sidebar() {
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
              <li>Life</li>
              <li>Music</li>
              <li>Style</li>
            </ul>
            <ul>
              <li>Sports</li>
              <li>Technology</li>
              <li>Cinema</li>
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
