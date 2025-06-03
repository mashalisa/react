import Button from '../basic/buttonOLD';
const Header = ({ page }) => {
    const handleClick = () => {
        console.log(`Add New ${page.label} clicked`);
        // You can also trigger a modal, navigate, or update state here
      };
    return (
        <div className="header">
            <h1>{page.label}</h1>
            { page.isButtonExists && <Button btnName={`+ Add New ${page.label}`} onClick={handleClick}/>}
            
        </div>
    )
}
export default Header;