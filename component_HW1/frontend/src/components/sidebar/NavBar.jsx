
import { Link, Route, useLocation } from "wouter";




const SideBar = ({  menu  }) => {

  console.log (menu)
  return (
   
    <div className="sidebar" >
      <div className="logo"><img src="/img/logo.png" alt="logo" /></div>
    {menu.map((navItem) => {
        // const pageName = Object.values(navItem)[0];
        console.log(navItem)
        return (
          <Link key={navItem.id} href={navItem.path} className={(active) => (active ? "active" : "")}><img  src={navItem.svg_path} alt={navItem.label} /><span>{navItem.label}</span></Link>
          
        );
      })}
    </div>
  );
}

export default SideBar; 