import { createSlice } from '@reduxjs/toolkit'

export const potsSlice = createSlice({
    name: 'pots',
    initialState: {
        pots:[]
    },
    reducers: {
        setPots: (state, action) => {
            state.pots = action.payload
        },
        addPot: (state, action) => {
            state.pots.push(action.payload);
          },
          deletePotsSlice: (state, action) => {
            state.pots = state.pots.filter(pot => pot.id !== action.payload);
          },
          editPotsSlice: (state, action) => {
            const { id, ...updatedPot } = action.payload;
            state.pots = state.pots.map(pot => pot.id === id ? updatedPot : pot);
          }
    }
})

export const { setPots, addPot, deletePotsSlice, editPotsSlice } = potsSlice.actions;