//The main Application that gets rendered by React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css"
import TopBar from "./components/TopBar/TopBar";
import Home from "./pages/Home/Home"
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Settings from "./pages/Settings/Settings"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register";
import NoPage from "./pages/NoPage/NoPage";
import { useContext } from "react";
import { Context } from "./context/Context";
import { ToastContainer } from 'react-toastify';
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <TopBar />
      <Routes>
        <Route exact path="/" >
          <Route index element={<Home />} />
          <Route exact path="write" element={user ? <Write /> : <Register />} />
          <Route exact path="settings" element={user ? <Settings /> : <Register />} />
          <Route exact path="login" element={user ? <Home /> : <Login />} />
          <Route exact path="register" element={user ? <Home /> : <Register />} />
          <Route exact path="post/:postId" element={<Single />} />
          <Route exact path="about" element={<About />} />
          <Route exact path="contact" element={<Contact />} />
          <Route exact path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;