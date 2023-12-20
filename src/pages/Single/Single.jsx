//Page to display a Single Post with Sidebar
import "./single.css"
import SideBar from "../../components/Sidebar/Sidebar"
import SinglePost from "../../components/SinglePost/SinglePost"

export default function Single() {
  return (
    <section className='single'>
      <SinglePost />
      <SideBar />
    </section>
  )
}