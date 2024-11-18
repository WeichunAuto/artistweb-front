import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/request";
import { AppDispatch } from "..";
import { Decoration } from "../../type/customTypes";

interface CacheDecorationStateInterface {
  cachedDecorations: Record<number, Decoration[]>,
  currentDecoration: Decoration[]
}

const initialState: CacheDecorationStateInterface = {
  cachedDecorations: {},
  currentDecoration: []
}

const cacheDecorationsSlice = createSlice({
  name: "cachedDecorations",
  initialState,
  reducers: {
    addDecorationToCache(state, action) {
      const {paintWorkId, decorations} = action.payload;

      const cachedDecoration = state.cachedDecorations[paintWorkId]
      if(!cachedDecoration) {
        state.cachedDecorations = {...state.cachedDecorations, [paintWorkId]: decorations}
      }
    },
    setCurrentDecoration(state, action) {
      state.currentDecoration = action.payload
    }
  },
});

const { addDecorationToCache, setCurrentDecoration } = cacheDecorationsSlice.actions;

const reducer = cacheDecorationsSlice.reducer;

const fetchCurrentDecoration = (paintWorkId: number, jwtToken: string) => {
  return async (dispatch: AppDispatch) => {
    const url: string = `/fetchDecorations/${paintWorkId}`
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    const tempDecorations = response.data;

    const decorations: Decoration[] = await Promise.all(
        tempDecorations.map(async (aDecoration: Decoration) => {
          try {
            const responseBytes = await axiosInstance.get(
              `/getOrigionalDecorationImage/${aDecoration.id}/image`,
              { 
                responseType: "blob",
                headers: {
                    Authorization: "Bearer " + jwtToken,
                  },
               }
            );
            const imageURL = URL.createObjectURL(responseBytes.data);
            // console.log('imageURL = ', imageURL)

            return { id: aDecoration.id, original: imageURL, thumbnail: imageURL };
          } catch (error) {
            console.error(
              "Error fetching image for aPaintWork ID:",
              aDecoration.id,
              error
            );
            return { id: aDecoration.id, original: '', thumbnail: '' };
          }
        })
      );
      dispatch(setCurrentDecoration(decorations))
      dispatch(addDecorationToCache({paintWorkId: paintWorkId, decorations: decorations}))

  };
};

export { fetchCurrentDecoration, setCurrentDecoration };

export default reducer;
