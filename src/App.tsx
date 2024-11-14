import React, { Component } from 'react'
import './css/output.css'
import WebBody from './components/body'

import {NextUIProvider} from "@nextui-org/react"; 

import JwtToken from './token/token'
import eventBus from './token/event'

export class App extends Component {

  async componentDidMount() {
    const jwtToken: string = await JwtToken.getToken()
    eventBus.emit('synToken', jwtToken) // send an event to share the token.
  }

  render() {
    return (
      <NextUIProvider>
          <WebBody />
      </NextUIProvider>
    )
  } 
}

export default App;