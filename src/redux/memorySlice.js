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
    deleteAll: memoryAdaptor.removeAll,
  },
});

export const { addCard, updateAll, updateCard, deleteAll } =
  memorySlice.actions;
export default memorySlice.reducer;
