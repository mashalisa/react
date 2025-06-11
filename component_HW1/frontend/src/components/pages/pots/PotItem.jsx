import colorBar from '../../config/ThemeColors';
import Card from '../../basic/Card';



const PotItem = (pot, children) => {
    console.log(pot, 'pot1 in pots')
    const colorBarPot = colorBar.find(color => color.color === pot.theme)
    console.log(colorBarPot, 'colorBarPot in progress bar')
    console.log(colorBarPot.number, 'colorBarPot.number in progress bar') 


return (
    <>
    {children}
 
    </>
   
)
}
export default PotItem;