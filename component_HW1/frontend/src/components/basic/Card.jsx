import ProgressBar from './ProgressBar';
import Button from './buttonOLD';


const Card = ({data, children}) => {
    console.log(data, 'usage in card')
   
    
    


    return (
        <div className="card">
            {children}
           
        </div>
    )
}
export default Card;