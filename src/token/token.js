import axiosInstance from '../axios/request'
import { App } from '../config'

let jwtToken = {
  getToken: async function() {
    jwtToken = await requestToken(); // Wait for the token to be retrieved asynchronously
    // console.log('New jwtToken:', jwtToken);
    return jwtToken
  }
} 

// Asynchronous request
async function requestToken() {
    
    try {
      const jwtRes = await axiosInstance.post('/login', {
        appName: App.appName,
        appKey: App.appKey
      })
      const jwtObject = jwtRes.data

      return jwtObject.token
    } catch (error) {
      console.log('login token request error.....')
      return null
    }
  }

  export default jwtToken