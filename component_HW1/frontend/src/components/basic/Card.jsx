import ProgressBar from './ProgressBar';
import Button from './buttonOLD';


const Card = ({data, children, style, className}) => {
    console.log(data, 'usage in card')
   
    
    


    return (
        <div className={className} style={style}>
            {children}
           
        </div>
    )
}
export default Card;