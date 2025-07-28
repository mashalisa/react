
import { Link, Route, useLocation } from "wouter";
import { useState } from "react";

import "./SidebarMobile.css"


const SideBarMobile = ({  menu  }) => {
 
  return (
   
    <div className="sidebar-mobile">

      <div className="menu flex-between">
    {menu.map((navItem) => {
        // const pageName = Object.values(navItem)[0];
        console.log(navItem)
        return (
          <Link key={navItem.id} href={navItem.path} className={(active) => (active ? "active" : "") }>
            <img  src={navItem.svg_path} alt={navItem.label} />
            { <p >{navItem.label}</p>}
            </Link>
          
        );
      })}
      </div>

     
    </div>
  );
}

export default SideBarMobile; 