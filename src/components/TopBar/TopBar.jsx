//Combining the two different Navbar styles properly
import { useContext } from "react";
import "./topbar.css";
import { Context } from "../../context/Context";
import ToggleNavbar from "./ToggleNavbar";
import FullNavbar from "./FullNavbar";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  return (
    <>
      <nav className="topBarParent">
        <FullNavbar user={user} dispatch={dispatch} />
      </nav>

      <ToggleNavbar user={user} dispatch={dispatch} />
    </>
  )
}