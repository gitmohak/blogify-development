import { useContext } from "react";
import "./topbar.css";
import { Context } from "../../context/Context";
import ToggleNavbar from "./ToggleNavbar";
import FullNavbar from "./FullNavbar";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  return (
    <>
      <FullNavbar user={user} dispatch={dispatch} />
      <ToggleNavbar user={user} dispatch={dispatch} />
    </>
  )
}