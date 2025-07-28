import Button from '../basic/buttonOLD';
import './Header.css';
const Header = ({ page, children}) => {
    console.log(page, 'page in header')
    const handleClick = () => {
        console.log(`Add New ${page.label} clicked`);
        // You can also trigger a modal, navigate, or update state here
      };
    return (
        <div className="header">
            <h1 className="title-font">{page}</h1>
            {children}
            
        </div>
    )
}
export default Header;