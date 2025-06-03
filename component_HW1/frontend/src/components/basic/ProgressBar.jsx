import {useState, useEffect} from 'react'



const ProgressBar = ({ pot, colorNumber, newAmount, formData }) => {
    console.log(newAmount, 'newAmount in progress bar')
    console.log(formData, 'formData in progress bar')
    console.log(pot, 'pot in progress bar')
    const [progress, setProgress] = useState(0)
    const [progressNew, setProgressNew] = useState(0)
    // let usage = 0
    // let usageNew = 0
    // if (newAmount){
        
    //     usage = Number(((newAmount / pot.goal_amount) * 100).toFixed(2));
    //     console.log(usage, 'usage in progress bar if newAmount')
    //     usageNew = Number(((formData / pot.goal_amount) * 100).toFixed(2));
    //     console.log(usageNew, 'usageNew in progress bar if newAmount')
    // } else {
    //     usage = Number(((pot.current_amount / pot.goal_amount) * 100).toFixed(2));
    //     console.log(usage, 'usage in progress bar if pot.current_amount')
    // }

    useEffect(() => {

        const goal = parseFloat(pot.goal_amount);
        const current = parseFloat(pot.current_amount);
        const newVal = parseFloat(newAmount || 0);
        const formVal = parseFloat(formData || 0); // If formData is a number, else adjust

        let usage = ((current / goal) * 100);
        let usageNew = newVal ? (formVal / goal) * 100 : 0;

                    // Clamp manually
            if (usage < 0) usage = 0;
            if (usage > 100) usage = 100;

            if (usageNew < 0 && newVal   < 0  ) usageNew = 0; console.log(usageNew, 'usageNew in progress bar if usageNew < 0')
            if (usageNew > 100) usageNew = 100;

            setProgress(usage.toFixed(2));
            setProgressNew(usageNew.toFixed(2));
    //     if (newAmount && newAmount < 0) {
    //         setProgress(0)
    //         setProgressNew(0)
    //         console.log(progress, 'progress in progress bar if newAmount < 0')
    //         console.log(progressNew, 'progressNew in progress bar if newAmount < 0')
    //     }
    //     else {
    //         if (newAmount && newAmount > pot.goal_amount) {
    //             setProgress(100)
    //             setProgressNew(100)
    //             console.log(progress, 'progress in progress bar if newAmount > pot.goal_amount')
    //             console.log(progressNew, 'progressNew in progress bar if newAmount > pot.goal_amount')
    //         }
    //         else {
    //             setProgress(usage)
    //             setProgressNew(usageNew)
    //             console.log(progress, 'progress in progress bar if newAmount > pot.goal_amount')
    //             console.log(progressNew, 'progressNew in progress bar if newAmount > pot.goal_amount')

    //     }
    // }
    }, [pot.current_amount, pot.goal_amount, newAmount])
        // if (newAmount || formData){
        //     if (newAmount < pot.goal_amount){
        //         if(newAmount < 0) {
        //             setProgress(0)
        //             setProgressNew(0)
        //             console.log(progress, 'progress in progress bar if newAmount < 0')
        //             console.log(progressNew, 'progressNew in progress bar if newAmount < 0')
        //         }
        //         else {
        //             setProgress(usage)
        //             setProgressNew(usageNew)
        //         }
              
        //     }
        //     else {
        //         setProgress(100)
        //     }
        // }
        // else {
        //     if (pot.current_amount < pot.goal_amount) {
        //         setProgress(usage)
        //     }
        //     else {
        //         setProgress(100)
        //     }
        // }
    // }, [pot.current_amount, pot.goal_amount, newAmount])
    return (
        <>
         
        { <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: `${colorNumber}` }}>               
            </div>
            {progressNew > 0 && (<div className="progress-bar-fill-new" style={{ width: `${progressNew}%`, backgroundColor: `black` }}></div>)}
        </div> }
        {<div className="progress-footer">
            {<div className="progress-label">
            {progress}%
        </div> }
        {<div className="progress-label label-target">
            Target of ${pot.goal_amount}
        </div> }
        </div> }
        
        </>
    );
};

export default ProgressBar;