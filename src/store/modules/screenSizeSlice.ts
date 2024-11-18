import { createSlice } from "@reduxjs/toolkit";

const screenSizeSlice = createSlice({
    name: 'screenSize',
    initialState: {
        isSmallScreen: false
    },
    reducers: {
        setIsSmallScreen(state, action) {
            state.isSmallScreen = action.payload
        }
    }
})

const {setIsSmallScreen} = screenSizeSlice.actions

const reducer = screenSizeSlice.reducer

export {setIsSmallScreen}
export default reducer