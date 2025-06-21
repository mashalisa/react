import { createSlice } from '@reduxjs/toolkit'

export const recurringBillsSlice = createSlice({
    name: 'recurringBills',
    initialState: {
        recurringBills:[]
    },
    reducers: {
        setRecurringBills: (state, action) => {
            state.recurringBills = action.payload
        },
        addRecurringBill: (state, action) => {
            state.recurringBills.push(action.payload);
          }
    }
})

export const { setRecurringBills, addRecurringBill } = recurringBillsSlice.actions;