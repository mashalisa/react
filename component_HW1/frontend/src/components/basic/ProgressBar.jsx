import {useState, useEffect} from 'react'



const ProgressBar = ({ total, current_amount, colorNumber, newAmount, formData }) => {
    console.log(total, 'total in progress bar')
    console.log(current_amount, 'current_amount in progress bar')
    console.log(newAmount, 'newAmount in progress bar')
    console.log(formData, 'formData in progress bar')
    // console.log(pot, 'pot in progress bar')
    const [progress, setProgress] = useState(0)
    const [progressNew, setProgressNew] = useState(0)
   

    useEffect(() => {

        const goal = parseFloat(total);
        const current = parseFloat(current_amount);
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
   
    }, [current_amount, total, newAmount])
      
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
            Target of ${total}
        </div> }
        </div> }
        
        </>
    );
};

export default ProgressBar;