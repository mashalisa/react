import { configureStore } from '@reduxjs/toolkit';
import { transactionSlice } from './transactionStore';
import { recurringBillsSlice } from './billsStore';
import { potsSlice } from './potsStore';

export const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer,
        recurringBills: recurringBillsSlice.reducer,
        pots: potsSlice.reducer
    }
});