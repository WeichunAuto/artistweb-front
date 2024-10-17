import React, { Component } from 'react'
import { Button, Input, Textarea, Checkbox } from '@nextui-org/react'
import { HeartIcon, MailIcon, PhoneIcon } from '../body/icons'
import SocialMedia from '../aboutMe/socialMedia'
import { capitalize } from '../utils'

export class Contact extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    isSubscribe: false,

    isFirstNameInvalid: false,
    isLastNameInvalid: false,
    isEmailInvalid: false,
    isPhoneNumberInvalid: false,
    isMessageInvalid: false
  }

  handleInput = (e) => {
    const {name, value} = e.target
    if(name === 'isSubscribe') {
      this.setState({[name]: e.target.checked})
    } else {
      this.setState({[name]: value})
      this.setState({['is'+capitalize(name)+'Invalid']: false})
    }
  }

  handleSubmit = () => {
    if (!this.validateFileds()) return false
    
  }

  validateFileds = () => {
    const {firstName, lastName, email, phoneNumber, message} = this.state
    if(firstName.trim() === '') {
      this.setState({isFirstNameInvalid: true})
      return false
    }
    if(lastName.trim() === '') {
      this.setState({isLastNameInvalid: true})
      return false
    }

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const emailInvalid = (value) => {
      if(value.trim() === '') return true
      return validateEmail(value) ? false : true
    }
    if(emailInvalid(email)) {
      this.setState({isEmailInvalid: true})
      return false
    }

    const validatePhone = (value) => value.match(/^\+|0\d+$/)
    const phoneInvalid = (value) => {
      if(value.trim() === '') return true
      return validatePhone(value) ? false : true
    }
    if(phoneInvalid(phoneNumber)) {
      this.setState({isPhoneNumberInvalid: true})
      return false
    }

    if(message.trim() === '') {
      this.setState({isMessageInvalid: true})
      return false
    }
  }

  render() {
    const {firstName, lastName, email, phoneNumber, message, isSubscribe, isFirstNameInvalid, isLastNameInvalid, isEmailInvalid, isPhoneNumberInvalid, isMessageInvalid} = this.state
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
                  name='firstName'
                  value={firstName}
                  isInvalid={isFirstNameInvalid}
                  errorMessage = 'Please provide your first name.'
                  onChange={this.handleInput}
                />
                <Input type='text' label='Last Name' placeholder="Enter your last name"
                  isRequired
                  name='lastName'
                  value={lastName}
                  isInvalid={isLastNameInvalid}
                  errorMessage = 'Please provide your last name.'
                  onChange={this.handleInput}
                />
              </div>
              <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8'>
                <Input type='email' label='Email'  placeholder="Enter your email" className='border-none' 
                  isRequired
                  name='email'
                  value={email}
                  isInvalid={isEmailInvalid}
                  errorMessage = 'Please provide your email address.'
                  onChange={this.handleInput}
                  startContent={
                    <MailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input type='text' label='Phone Number (Optional)' placeholder="Enter your phone number" 
                  name='phoneNumber'
                  value={phoneNumber}
                  isInvalid={isPhoneNumberInvalid}
                  errorMessage = 'Please provide a correct phone number format.'
                  onChange={this.handleInput}
                  startContent={
                    <PhoneIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>

              <div className='mt-8'>
                <Textarea label='Message' placeholder='What do you have in your mind?'
                  name='message'
                  isInvalid={isMessageInvalid}
                  errorMessage = 'Please write what you want to say.'
                  value={message}
                  onChange={this.handleInput}
                />
              </div>
              <div className='mt-2'>
                <Checkbox size='sm' defaultSelected={isSubscribe}
                  name='isSubscribe'
                  value={isSubscribe}
                  isSelected={isSubscribe}
                  onChange={this.handleInput}
                >
                  Subscribe me to receive my latestwork.
                </Checkbox>
              </div>

              <div className='mt-10 w-full flex justify-end'>
                <Button 
                  startContent={<HeartIcon width='20px' height='20px'/>}
                  isLoading={false}
                  className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
                  onPress={this.handleSubmit}
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
