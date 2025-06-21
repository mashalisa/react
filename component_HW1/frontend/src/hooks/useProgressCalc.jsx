import { useMemo } from "react";

const useProgressCalc = (total, current_amount, newAmount, formData) => {
    const goal = parseFloat(total);
    const current = parseFloat(current_amount);
    const newVal = parseFloat(newAmount || 0);
    const formVal = parseFloat(formData || 0); // If formData is a number, else adjust
  

    
    const { usage, usageNew } = useMemo(() => {  
    let usage = ((current / goal) * 100);
    let usageNew = newVal ? (formVal / goal) * 100 : 0;

        if (newVal   < 0  ) {
            usageNew = 0; 
            console.log(usageNew, 'usageNew in progress bar if usageNew < 0')
        }
        if (newVal > goal) {
            usageNew = 100; 
            console.log(usageNew, 'usageNew in progress bar if usageNew > 100')
        } 
        return { usage, usageNew }
    }, [current, goal, newVal, formVal])

    return {  goal,
        current,
        newVal,
        formVal,
        usage,
        usageNew, }
}

export default useProgressCalc;