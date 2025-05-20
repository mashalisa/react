
import NavItem from "./NavItem";




const SideBar = ({ setPage, menu, activePage  }) => {
  console.log (menu)
  return (
   
    <div className="sidebar" >
    {menu.map((navItem) => {
        // const pageName = Object.values(navItem)[0];
        console.log(navItem)
        return (
          <NavItem
            key={navItem.id}
            navItem={navItem}
            setPage={setPage}
            activePage={activePage}
          />
        );
      })}
    </div>
  );
}

export default SideBar; 