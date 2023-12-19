import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarTitle">ABOUT ME</div>
        <img src="/images/about.jpg" alt="About Me" />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id, qui exercitationem possimus ea architecto? Voluptates, similique.</p>
      </div>

      <div className="sidebarHeader">
        <div className="sidebarTitle">FOLLOW ME</div>
        <div className="social">

          <a className="link" target="_blank" href="https://www.linkedin.com/in/mohakarora/">
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a className="link" target="_blank" href="https://twitter.com/itsMohak">
            <i className="fa-brands fa-square-twitter"></i>
          </a>

          <a className="link" target="_blank" href="https://youtube.com/itsmohak">
            <i className="fa-brands fa-square-youtube"></i>
          </a>

          <a className="link" target="_blank" href="https://www.instagram.com/itsMohak/">
            <i className="fa-brands fa-square-instagram"></i>
          </a>
        </div>
      </div>
    </aside>
  )
}
