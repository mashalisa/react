import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions:[]
    },
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload
        },
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
          }
    }
})

export const { setTransactions, addTransaction } = transactionSlice.actions;