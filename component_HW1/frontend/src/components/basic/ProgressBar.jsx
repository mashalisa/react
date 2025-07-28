// import {useState, useEffect} from 'react'
import useProgressCalc from '../../hooks/useProgressCalc'



const ProgressBar = ({ total, current_amount, colorNumber, newAmount, formData, style }) => {
    console.log(total, 'total in progress bar')
    console.log(current_amount, 'current_amount in progress bar')
    console.log(newAmount, 'newAmount in progress bar')
    console.log(formData, 'formData in progress bar')
    // console.log(pot, 'pot in progress bar')
    // const [progress, setProgress] = useState(0)
    // const [progressNew, setProgressNew] = useState(0)
   

    const { usage, usageNew} = useProgressCalc(total, current_amount, newAmount, formData)

    // setProgress(usage.toFixed(2))
    // setProgressNew(usageNew.toFixed(2))
    // useEffect(() => {

     
        // const goal = parseFloat(total);
        // const current = parseFloat(current_amount);
        // const newVal = parseFloat(newAmount || 0);
        // const formVal = parseFloat(formData || 0); // If formData is a number, else adjust
    //     let usage = ((current / goal) * 100);
    //     let usageNew = newVal ? (formVal / goal) * 100 : 0;

    //                 // Clamp manually
    //         // if (usage < 0) usage = 0;
    //         // if (usage > 100) usage = 100;

    //         if (newVal   < 0  ) {
    //             usageNew = 0; 
    //             console.log(usageNew, 'usageNew in progress bar if usageNew < 0')
    //         }
    //         if (newVal > goal) {
    //             usageNew = 100; 
    //             console.log(usageNew, 'usageNew in progress bar if usageNew > 100')
    //         } 

    //         setProgress(usage.toFixed(2));
    //         console.log(usage, 'usage in progress bar')
    //         console.log(progress, 'progress in progress bar')
    //         setProgressNew(usageNew.toFixed(2));
    //         console.log(usageNew, 'usage in progress bar')
    //         console.log(progressNew, 'progressNew in progress bar')
    // }, [current_amount, total, newAmount, formData])
      
    return (
        <>
         
        {/* { <div className="progress-bar" style={style}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: `${colorNumber}` }}>               
            </div>
            {progressNew > 0 && (<div className="progress-bar-fill-new" style={{ width: `${progressNew}%`, backgroundColor: `black` }}></div>)}
        </div> } */}


        { <div className="progress-bar" style={style}>
            <div className="progress-bar-fill" style={{ width: `${usage.toFixed(2)}%`, backgroundColor: `${colorNumber}` }}>               
            </div>
            {usageNew > 0 && (<div className="progress-bar-fill-new" style={{ width: `${usageNew.toFixed(2)}%`, backgroundColor: `black` }}></div>)}
        </div> }
       
        
        </>
    );
};

export default ProgressBar;