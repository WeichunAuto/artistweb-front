import React, { Component } from 'react'
import { Button, Input, Textarea, Checkbox, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { HeartIcon, MailIcon, PhoneIcon } from '../body/icons'
import SocialMedia from '../aboutMe/socialMedia'
import { capitalize } from '../utils'
import axiosInstance from '../../axios/request'
import eventBus from '../../token/event'

export class Contact extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    subscribe: false,

    isFirstNameInvalid: false,
    isLastNameInvalid: false,
    isEmailInvalid: false,
    isPhoneNumberInvalid: false,
    isMessageInvalid: false,

    isOpen: false,
    jwtToken: ''
  }

  componentDidMount() {
    eventBus.addListener('synToken', this.handleTokenEvent)
  }
  componentWillUnmount() {
    eventBus.removeListener('synToken', this.handleTokenEvent)
  }
  handleTokenEvent = (jwtToken) => {
    this.setState({ jwtToken: jwtToken })
  }


  handleInput = (e) => {
    const { name, value } = e.target
    if (name === 'subscribe') {
      this.setState({ [name]: e.target.checked })
    } else {
      this.setState({ [name]: value })
      this.setState({ ['is' + capitalize(name) + 'Invalid']: false })
    }
  }

  /**
   * Submit the contact form.
   * @returns 
   */
  handleSubmit = () => {
    if (!this.validateFields()) return false

    const contactData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      message: this.state.message,
      subscribe: this.state.subscribe,
    }
    const formData = new FormData();
    formData.append(
      "contactMe",
      new Blob([JSON.stringify(contactData)], { type: "application/json" })
    );

    console.log(contactData)
    axiosInstance.post("/sendMessage", formData, {
      headers: {
        'Authorization': 'Bearer ' + this.state.jwtToken
      }
    })
    .then((response) => {
      const statusCode = response.status
      if(statusCode === 201) {
        this.updatePops()
      } else if(statusCode === 401) {
        console.log('invalid token.....')
        window.location.reload()
      }
    })

    
  }

  /**
   * validate form fields.
   * @returns 
   */
  validateFields = () => {
    const { firstName, lastName, email, phoneNumber, message } = this.state
    if (firstName.trim() === '') {
      this.setState({ isFirstNameInvalid: true })
      return false
    }
    if (lastName.trim() === '') {
      this.setState({ isLastNameInvalid: true })
      return false
    }

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const emailInvalid = (value) => {
      if (value.trim() === '') return true
      return validateEmail(value) ? false : true
    }
    if (emailInvalid(email)) {
      this.setState({ isEmailInvalid: true })
      return false
    }

    const validatePhone = (value) => value.match(/^\+|0\d+$/)
    const phoneInvalid = (value) => {
      if (value.trim() === '') return false
      return validatePhone(value) ? false : true
    }
    if (phoneInvalid(phoneNumber)) {
      this.setState({ isPhoneNumberInvalid: true })
      return false
    }

    if (message.trim() === '') {
      this.setState({ isMessageInvalid: true })
      return false
    }

    return true
  }

  /**
   * open Pop tips and close it after 2 seconds.
   */
  updatePops = () => {
    this.setState({ isOpen: true })
    setTimeout(() => {
      this.setState({ isOpen: false })
    }, 2000)
  }

  render() {
    const { firstName, lastName, email, phoneNumber, message, subscribe, isFirstNameInvalid, isLastNameInvalid, isEmailInvalid, isPhoneNumberInvalid, isMessageInvalid, isOpen } = this.state
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
                  errorMessage='Please provide your first name.'
                  onChange={this.handleInput}
                />
                <Input type='text' label='Last Name' placeholder="Enter your last name"
                  isRequired
                  name='lastName'
                  value={lastName}
                  isInvalid={isLastNameInvalid}
                  errorMessage='Please provide your last name.'
                  onChange={this.handleInput}
                />
              </div>
              <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8'>
                <Input type='email' label='Email' placeholder="Enter your email" className='border-none'
                  isRequired
                  name='email'
                  value={email}
                  isInvalid={isEmailInvalid}
                  errorMessage='Please provide your email address.'
                  onChange={this.handleInput}
                  startContent={
                    <MailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input type='text' label='Phone Number (Optional)' placeholder="Enter your phone number"
                  name='phoneNumber'
                  value={phoneNumber}
                  isInvalid={isPhoneNumberInvalid}
                  errorMessage='Please provide a correct phone number format.'
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
                  errorMessage='Please write what you want to say.'
                  value={message}
                  onChange={this.handleInput}
                />
              </div>
              <div className='mt-2'>
                <Checkbox size='sm' defaultSelected={subscribe}
                  name='subscribe'
                  value={subscribe}
                  isSelected={subscribe}
                  onChange={this.handleInput}
                >
                  Subscribe me to receive my latestwork.
                </Checkbox>
              </div>

              <div className='mt-10 w-full flex justify-end'>
                <Popover placement="bottom" showArrow={true} isOpen={isOpen}>
                  <PopoverTrigger>
                    <Button
                      startContent={<HeartIcon width='20px' height='20px' />}
                      isLoading={false}
                      className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
                      onClick={this.handleSubmit}
                    >
                      SEND
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Success</div>
                      <div className="text-tiny">Your message has been sent.</div>
                    </div>
                  </PopoverContent>
                </Popover>
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
