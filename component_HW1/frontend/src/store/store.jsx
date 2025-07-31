import { configureStore } from '@reduxjs/toolkit';
import { transactionSlice } from './transactionStore';
import { recurringBillsSlice } from './billsStore';
import { potsSlice } from './potsStore';
import { budgetsSlice } from './budgetStore';
import loadingSlice from './loadingSlice';

export const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer,
        recurringBills: recurringBillsSlice.reducer,
        pots: potsSlice.reducer,
        budgets: budgetsSlice.reducer,
        loading: loadingSlice.reducer,
    }
});