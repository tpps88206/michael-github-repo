import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  queue: [],
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    closeNotification: (state, action) => {
      state.open = false;
    },
    addNotification: (state, action) => {
      const { notification } = action.payload;
      state.open = true;
      state.queue = [...state.queue, notification];
    },
    processNotification: (state, action) => {
      if (state.queue.length > 1) {
        return {
          ...state,
          open: true,
          queue: state.queue.slice(1),
        };
      }
      return {
        ...state,
        open: false,
        queue: [],
      };
    },
  },
});

export const { closeNotification, addNotification, processNotification } = slice.actions;

export default slice.reducer;
