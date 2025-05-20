const NavItem = ({ navItem, setPage, activePage  }) => {
  const isActive = navItem.id === activePage.id;
  return (
    <div
       className={`mini-box ${isActive ? 'active' : 'item'}`}
      onClick={() => {
        console.log('item',navItem);
        setPage(navItem);
      }}
    >
      <a href="#" ><span>{navItem.label}</span></a>
    </div>
  );
};

export default NavItem;