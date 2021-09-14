import React, { useEffect, useState } from "react";
import "./Nav.scss";
import logo from "../../assets/img/eiffel-tower.png";
import burger from '../../assets/img/menu.png'
import close from '../../assets/img/fermer.png'
import { NavLink } from "react-router-dom";

export const Nav = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [toggleMenu, setToggleMenu] = useState(false)
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
  const updateWidth = () => {
    setWidth(window.innerWidth)
    if(window.innerWidth > 900) setToggleMenu(false)
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
        window.removeEventListener("resize", updateWidth);
    }
  }, []);
  return (
    <nav>
      <img  className="logo" src={logo} alt="logo de paris" />
      { (toggleMenu || width > 900) && <ul>
        <li>
          <NavLink exact to="/" activeClassName="selected">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" activeClassName="selected">
            Rechercher
          </NavLink>
        </li>
        <li>
          <NavLink to="/favories" activeClassName="selected">
            Favoris
          </NavLink>
        </li>
      </ul> }
      {!toggleMenu ? <img src={burger} alt="menu burger" className='burger' onClick={toggleNav}/> : <img src={close} alt="menu burger" className='burger' onClick={toggleNav}/>}  
    </nav>
  );
};
