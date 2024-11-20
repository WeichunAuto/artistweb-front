import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/request";
import { AppDispatch } from "..";
import { PaintWork } from "../../type/customTypes";

interface PaintWorkState {
  paintWorks: PaintWork[];
  maxPageNum: number;
}

const initialState: PaintWorkState = {
  paintWorks: [],
  maxPageNum: 1,
};

const paintWorkSlice = createSlice({
  name: "paintWorks",
  initialState,
  reducers: {
    addPaintWorks(state, action) {
      const previoisPaintWorks = [...state.paintWorks];
      previoisPaintWorks.push(...action.payload);
      state.paintWorks = previoisPaintWorks
    },
    updatePaintWorkCoverURL(state, action) {
      const { id, coverURL } = action.payload;
      state.paintWorks.forEach((paintWork) => {
        if (id === paintWork.id) {
          if (paintWork.coverURL === "") {
            paintWork.coverURL = coverURL;
          }
        }
      });
    },
    setMaxPageNum(state, action) {
      state.maxPageNum = action.payload;
    },
  },
});

const { addPaintWorks, updatePaintWorkCoverURL, setMaxPageNum } =
  paintWorkSlice.actions;

const reducer = paintWorkSlice.reducer;

const fetchPaintWorks = (
  pageSize: number,
  pageNum: number,
  jwtToken: string
) => {
  
  return async (dispatch: AppDispatch) => {
    const url: string = `/fetchPaintWorks/${pageSize}/${pageNum}`;
    // console.log("fetch paint works....", url);
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });
    dispatch(addPaintWorks(response.data));
  };
};

const getMaxPageNum = (pageSize: number, jwtToken: string) => {
  return async (dispatch: AppDispatch) => {
    const url: string = `/fetchMaxPageNum/${pageSize}`;
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });
    dispatch(setMaxPageNum(response.data));
  };
};

export { fetchPaintWorks, updatePaintWorkCoverURL, getMaxPageNum };

export default reducer;
