import { useEffect } from 'react'
import './css/output.css'
import WebBody from './components/body'

import {NextUIProvider} from "@nextui-org/react"; 

import { useDispatch } from 'react-redux';
import { fetchJwtToken } from './store/modules/jwtTokenSlice';
import { AppDispatch } from './store';

export function App()  {
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(()=> {
    dispatch(fetchJwtToken())
  },[dispatch])

    return (
      <NextUIProvider>
          <WebBody />
      </NextUIProvider>
    )
  } 


export default App;