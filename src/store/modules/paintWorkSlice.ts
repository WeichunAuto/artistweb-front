import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/request";
import { AppDispatch } from "..";
import { PaintWork } from "../../type/customTypes";

interface PaintWorkState {
    paintWorks: PaintWork[]
}

const initialState: PaintWorkState = {
    paintWorks: []
}

const paintWorkSlice = createSlice({
  name: "paintWorks",
  initialState,
  reducers: {
    setPaintWorks(state, action) {
      state.paintWorks = action.payload;
    },
  },
});

const { setPaintWorks } = paintWorkSlice.actions;

const reducer = paintWorkSlice.reducer;

const fetchPaintWorks = (jwtToken: string) => {
  return async (dispatch: AppDispatch) => {
    const url: string = "/fetchPaintWorks";
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });
    dispatch(setPaintWorks(response.data));
  };
};

export { fetchPaintWorks };

export default reducer;
