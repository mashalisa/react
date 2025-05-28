import Button from '../basic/button';
const Header = ({ page }) => {
    return (
        <div className="header">
            <h1>{page.label}</h1>
            { page.isButton && <Button btnName={`+ Add New ${page.label}`} />}
        </div>
    )
}
export default Header;