import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/request";
import { AppDispatch } from "..";


const menuSlice = createSlice({
    name: 'menus',
    initialState: {
        selectedMenuIndex: 0,
        menuList: [] 
    },
    reducers: {
        setMenuList(state, action) {
            state.menuList = action.payload
        },
        setSelectedMenuIndex(state, action) {
            state.selectedMenuIndex = action.payload
        }
    }
})

const {setMenuList, setSelectedMenuIndex} = menuSlice.actions

const reducer = menuSlice.reducer

const fetchMenuList = (jwtToken: string)=> {
    return async (dispatch: AppDispatch)=> {
        const url: string = '/getMenuItems'
        const response = await axiosInstance.get(url, {
            headers: {
              'Authorization': 'Bearer ' + jwtToken
            }
          })
          dispatch(setMenuList(response.data))
    }
}

export {fetchMenuList, setSelectedMenuIndex}
export default reducer
