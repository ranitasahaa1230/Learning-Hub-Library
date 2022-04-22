import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme, useVideos } from "../../contexts";
import { useToast } from "../../hooks";
import { videosActions } from "../../reducers/actionTypes";

export const Header = ({ handleToggleSidebar }) => {
  const { theme, changeTheme } = useTheme();
  const {
    state: { isAuth, user },
  } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    videoDispatch,
  } = useVideos();
  const { FILTER_BY_SEARCH } = videosActions;

  const logoutHandler = () => {
    // localStorage.removeItem("login");
    // localStorage.removeItem("user");
    // localStorage.removeItem("signup");
    localStorage.clear();
    navigate(0);
    showToast("Logged Out!", "success");
  };

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={22}
        onClick={() => handleToggleSidebar()}
      />

      <div className="flex__hub">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <Link to="/" className="header__name">
          Learning Hub
        </Link>
      </div>

      <form>
        <input type="text" placeholder="Search" 
        onChange={(e) =>videoDispatch({ type: FILTER_BY_SEARCH, payload: e.target.value })}/>
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="mode__icons" onClick={changeTheme}>
        {theme ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </div>

      <Link to="/signup">
        <button className="header__signup">SIGN UP</button>
      </Link>

      {isAuth ? (
        <div className="header__icons">
          <span className="header__user">
            {user?.firstName}
            <FaAngleRight size={22} />
          </span>
          <button className="header__logout" onClick={logoutHandler}>
            LOGOUT
          </button>
        </div>
      ) : (
        <Link to="/login">
          <div className="header__icons">
            <i className="fa-solid fa-user"></i>
            <span className="font__icons">LOGIN</span>
          </div>
        </Link>
      )}
    </div>
  );
};
