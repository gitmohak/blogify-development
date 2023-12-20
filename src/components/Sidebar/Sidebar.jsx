import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarHeader text-center">
        <div className="sidebarTitle">ABOUT ME</div>
        <img src="/images/about-2.jpg" alt="About Me" />
        <p className="mt-3">Mohak Arora here. I am a great Web Developer. I hope you enjoy this beautiful Full Stack (MERN Stack) Web Application made by me.</p>

        <div className="sidebarTitle">TECHNOLOGY</div>
        <img src="/images/laptop.jpg" alt="About Me" />
        <p className="mt-3">MERN stack is a collection of technologies that enables faster application development. It is used by developers worldwide. The main purpose of using MERN stack is to develop apps using JavaScript. </p>
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
