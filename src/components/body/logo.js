import React from 'react'
import Glogo from '../../imgs/painting-logo.png'

  export function Logo(props) {
    const {width, height} = props
    return (
      <img className={`${width} ${height}`} src={Glogo} alt='' />
    )
  }
  
  export default Logo
  