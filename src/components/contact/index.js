import React, { Component } from 'react'
import { Button, Input, Textarea, Checkbox } from '@nextui-org/react'
import { HeartIcon } from '../body/icons'
import SocialMedia from '../aboutMe/socialMedia'

export class Contact extends Component {
  render() {
    return (
      <div className='w-full pt-16 h-auto'>
        <p className='font-georgian text-5xl lg:text-7xl text-center mb-8'>get in touch.</p>
        <p className='w-5/6 font-sans pb-16 text-center text-base word-spacing-wider tracking-widest mx-auto'>download & print. bring street art into your home.</p>

        <div className='w-full h-auto relative pt-6 pb-6 bg-pink-400'>
          <div className='pb-10 w-11/12 lg:w-4/5 xl:w-2/3 2xl:xl:w-2/3 h-auto mx-auto bg-white rounded-lg drop-shadow-lg'>
            <div className='px-6 lg:px-28 pt-8 lg:pt-12'>
              <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                <Input type='text' label='First Name' placeholder="Enter your first name" className='border-none'
                  isRequired
                  isInvalid={true}
                  errorMessage = 'Please provide your email address.'
                />
                <Input type='text' label='Last Name' placeholder="Enter your last name"
                  isRequired
                />
              </div>
              <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8'>
                <Input type='email' label='Email'  placeholder="Enter your email" className='border-none' 
                  isRequired
                  isInvalid={true}
                  errorMessage = 'Please provide your email address.'
                />
                <Input type='text' label='Phone Number (Optional)'   placeholder="Enter your phone number" />
              </div>

              <div className='mt-8'>
                <Textarea label='Message' placeholder='What do you have in your mind?'/>
              </div>
              <div className='mt-2'>
                <Checkbox size='sm'>Subscribe me to receive my latestwork.</Checkbox>
              </div>

              <div className='mt-10 w-full flex justify-end'>
                <Button 
                  startContent={<HeartIcon width='20px' height='20px'/>}
                  isLoading={false}
                  className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
                >
                  SEND
                </Button>
              </div>

              <div className='w-full mt-6 flex justify-center'>
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact
