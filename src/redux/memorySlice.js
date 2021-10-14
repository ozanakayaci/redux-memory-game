import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const memoryAdaptor = createEntityAdapter();
const initialState = memoryAdaptor.getInitialState();

export const cardSelectors = memoryAdaptor.getSelectors(
  (state) => state.memory
);

const memorySlice = createSlice({
  name: "memory",
  initialState: initialState,
  reducers: {
    addCard: memoryAdaptor.addOne,
    updateAll: memoryAdaptor.updateMany,
    updateCard: memoryAdaptor.updateOne,
  },
});

export const { addCard, updateAll, updateCard } = memorySlice.actions;
export default memorySlice.reducer;
