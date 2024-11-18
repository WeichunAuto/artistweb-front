import { configureStore } from "@reduxjs/toolkit";
import menuSlice from './modules/menuSlice'
import paintWorkSlice from './modules/paintWorkSlice'
import screenSizeSlice from './modules/screenSizeSlice'
import jwtTokenSlice from './modules/jwtTokenSlice'
import cacheDecorationsSlice from './modules/cacheDecorationsSlice'

const store = configureStore({
    reducer: {
        menus: menuSlice,
        paintWorks: paintWorkSlice,
        screenSize: screenSizeSlice,
        jwtToken: jwtTokenSlice,
        cachedDecorations: cacheDecorationsSlice
    }
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export {AppDispatch, RootState}

export default store