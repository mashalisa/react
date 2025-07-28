import { createSlice } from '@reduxjs/toolkit'

export const budgetsSlice = createSlice({
    name: 'budgets',
    initialState: {
        budgets:[]
    },
    reducers: {
        setBudgets: (state, action) => {
            state.budgets = action.payload
        },
        addBudget: (state, action) => {
            // Ensure budgets is an array before pushing
            if (!Array.isArray(state.budgets)) {
                state.budgets = [];
            }
            // Handle both direct data and nested data structure
            const budgetData = action.payload?.data || action.payload;
            if (budgetData) {
                state.budgets.push(budgetData);
            }
        },
        editBudgetSlice: (state, action) => {
            if (!Array.isArray(state.budgets)) {
                state.budgets = [];
            }
            const { id, ...updatedBudget } = action.payload?.data || action.payload;
            state.budgets = state.budgets.map(budget => budget.id === id ? updatedBudget : budget);
        },
        deleteBudgetSlice: (state, action) => {
            if (!Array.isArray(state.budgets)) {
                state.budgets = [];
            }
            state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
        }
    }
})

export const { setBudgets, addBudget, editBudgetSlice, deleteBudgetSlice } = budgetsSlice.actions;