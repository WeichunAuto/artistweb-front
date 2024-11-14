import { configureStore } from "@reduxjs/toolkit";
import menuSlice from './modules/menuSlice'

const store = configureStore({
    reducer: {
        menus: menuSlice
    }
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export {AppDispatch, RootState}

export default store