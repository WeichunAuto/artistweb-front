import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import JwtToken from "../../token/token";

const jwtTokenSlice = createSlice({
    name: 'jwtToken',
    initialState: {
        jwtToken: '',
        
    },
    reducers: {
        setJwtToken(state, action) {
            state.jwtToken = action.payload
        }
    }
})

const {setJwtToken} = jwtTokenSlice.actions

const reducer = jwtTokenSlice.reducer

const fetchJwtToken = ()=> {
    return async (dispatch: AppDispatch)=> {
        const jwtToken: string = await JwtToken.getToken()
          dispatch(setJwtToken(jwtToken))
    }
}

export {fetchJwtToken}
export default reducer
