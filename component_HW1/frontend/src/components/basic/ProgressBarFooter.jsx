import { useEffect } from "react";
import useProgressCalc from '../../hooks/useProgressCalc'

const ProgressBarFooter = (current_amount) => {
    console.log(current_amount, 'current_amount in ProgressBarFooter')

    const { usage, usageNew, goal} = useProgressCalc(
        current_amount.total, 
        current_amount.current_amount,
         current_amount.newAmount, 
         current_amount.formData)
    
    // const goal = parseFloat(current_amount.total).toFixed(2);
    // const current = parseFloat(current_amount.current_amount).toFixed(2);
    // const newVal = parseFloat(current_amount.newAmount || 0).toFixed(2);
    // const formVal = parseFloat(current_amount.formData || 0).toFixed(2); // If formData is a number, else adjust
    // let usage = ((current / goal) * 100);
    // let usageNew = newVal ? (formVal / goal) * 100 : 0;
//       useEffect(() => {
//         console.log(usage, 'usage in ProgressBarFooter')
//         console.log(usageNew, 'usageNew in ProgressBarFooter')
   
// }, [current_amount])
    return (
        <>
        {/* <div className="progress-footer">
                    <div className="progress-label">
                        {usageNew > 0 ? `${usageNew.toFixed(2)}%` : `${usage.toFixed(2)}%`}
                    </div>
                    <div className="progress-label label-target">
                        Target of ${goal}
                    </div>
                </div> */}

                <div className="progress-footer">
                    <div className="progress-label">
                       <h5 className="gray-500 bold">{usageNew > 0 ? `${usageNew.toFixed(2)}%` : `${usage.toFixed(2)}%`}</h5>
                    </div>
                    <div className="progress-label label-target">
                        <h5 className="gray-500">Target of ${goal}</h5>
                    </div>
                </div>
        </>
   
    )
  
}

export default ProgressBarFooter;