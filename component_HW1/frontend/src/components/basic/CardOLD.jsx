import ProgressBar from './ProgressBar';
import Button from './buttonOLD';


const CardOLD = ({pot}) => {
    console.log(pot, 'usage in card')
    const colorBar = [
        {'color': 'cyan', 'number': '#00FFFF'},
        {'color': 'navy', 'number': '#000080'},
        {'color': 'magenta', 'number': '#FF00FF'},
        {'color': 'fuchsia', 'number': '#FF00FF'},
        {'color': 'purple', 'number': '#800080'},
        {'color': 'pink', 'number': '#FFC0CB'},
        {'color': 'red', 'number': '#FF0000'},
        {'color': 'orange', 'number': '#FFA500'},
        {'color': 'yellow', 'number': '#FFFF00'},
        {'color': 'green', 'number': '#008000'},
        {'color': 'blue', 'number': '#0000FF'},
        {'color': 'brown', 'number': '#A52A2A'},
        {'color': 'gray', 'number': '#808080'},
        {'color': 'black', 'number': '#000000'},
        {'color': 'white', 'number': '#FFFFFF'},
        {'color': 'army', 'number': '#4B5320'},
        {'color': 'teal', 'number': '#008080'}
    ]
    const colorBarPot = colorBar.find(color => color.color === pot.theme)
    console.log(colorBarPot, 'colorBarPot in progress bar')
    console.log(colorBarPot.number, 'colorBarPot.number in progress bar')    
    
    


    return (
        <div className="card">
           
            <h3><span className="theme-color">{pot.name}</span></h3>
         
            <ProgressBar pot={pot} colorNumber={colorBarPot["number"]} />
            <Button btnName="Add Money" pot={pot} />
            <Button btnName="Withdraw" pot={pot} />
        </div>
    )
}
export default CardOLD;