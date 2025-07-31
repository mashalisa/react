
import { Link, Route, useLocation } from "wouter";
import { useState } from "react";

import "./Sidebar.css"


const SideBar = ({  menu  }) => {
  const [rotate, setRotate] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const [minimazeSidebar, setMinimazeSidebar] = useState(false);
  const [_, navigate] = useLocation()
  const handleClick = () => {
    if (minimazeSidebar) {
    setMinimazeSidebar(false);
    setRotate(false);
    } else {
    setRotate(true);
    setOpacity(true);
    setMinimazeSidebar(true);
    }
  }
  console.log (menu)
  return (
   
    <div className={`sidebar ${minimazeSidebar ? "sidebar--minimized" : "sidebar--minimized-out"}`}>
      <div className="logo">
       {!minimazeSidebar && <img src="/img/logo.png" alt="logo" />}
       {minimazeSidebar && <img src="/img/icons/logo-mobile.png" alt="logo" />}
        </div>
      <div className="menu">
    {menu.map((navItem) => {
        // const pageName = Object.values(navItem)[0];
        console.log(navItem)
        return (
          <Link key={navItem.id} href={navItem.path} className={(active) => (active ? "active" : "") }>
            <img  src={navItem.svg_path} alt={navItem.label} />
            { <span className={`${!minimazeSidebar ? "font-size-grow" : "font-size-grow-out"}`}>{navItem.label}</span>}
            </Link>
          
        );
      })}
           <a onClick={() => {navigate('/login'); localStorage.removeItem('authToken'); window.location.reload()}} style={{cursor: 'pointer'}}><span>Logout</span></a>
      </div>
      <div className="menu-btn-container">
   
      <button onClick={handleClick} alt="menu" className={`menu-btn flex-center ${rotate ? "button-animate" : "button-animate-out"}`}>
        <img   src="/img/icons/arrow-menu.png" alt="menu"  />
      <span  className={`${opacity ? "button-animate-opacity capitalize" : "capitalize"}`}>Minimize menu</span>
      </button>
      </div>
     
    </div>
  );
}

export default SideBar; 