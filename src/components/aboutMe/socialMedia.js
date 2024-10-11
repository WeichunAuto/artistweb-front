import React from 'react'
import { LinkedInIcon, InstagramInIcon, FacebookInIcon } from '../body/icons'

function SocialMedia() {
  return (
    <div className='w-28 first-line:lg:w-36 h-10 grid grid-cols-3 gap-1 lg:gap-4 justify-items-center content-center'>
      <LinkedInIcon className='cursor-pointer'/>
      <InstagramInIcon className='cursor-pointer'/>
      <FacebookInIcon className='cursor-pointer'/>
    </div>
  )
}

export default SocialMedia
