import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Points {
  points: number;
}

const initialState: Points = {
  points: 0,
};

const slice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<Points>) => {
      state.points = action.payload.points;
    },
  },
});

export default slice;
