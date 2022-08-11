import { useState } from "react";
import { categories } from "./categories";
import { Link } from "react-router-dom";
function Header({ submitHandler, value }) {
  const [showMenu, setShowMenu] = useState(false);

  const menuHandler = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };
  return (
    <div className="Header">
      <div className="parentnav">
        <div className="navheader">
          <div className="brand">
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "35px",
              }}
            >
              News App
            </Link>
          </div>
          <ul>
            {categories.map((item, index) => {
              return (
                <li
                  style={{
                    borderBottom: value === item && `5px solid white`,
                  }}
                  onClick={(e) => submitHandler(e, item)}
                  key={index}
                >
                  <Link
                    key={index}
                    to={`/${item}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="menuicon">
            <Link to="/">
              <i
                style={{ color: "white" }}
                onClick={menuHandler}
                className="fa-solid fa-bars"
              ></i>
            </Link>
          </div>
        </div>
        {showMenu && (
          <div className="menubar">
            <ul>
              {categories?.map((category) => {
                return (
                  <div className="toggle">
                    <Link
                      to={category}
                      onClick={(e) => setShowMenu(false)}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {/* <li
                      onClick={(e) => {
                        submitHandler(e, category);
                        menuHandler();
                      }}
                    >
                      {category}
                    </li> */}
                      {category}
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
