import  { useState, useEffect } from 'react'
import { Button, Input, Textarea, Checkbox, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { HeartIcon, MailIcon, PhoneIcon } from '../body/icons'
import SocialMedia from '../aboutMe/socialMedia'
import { capitalize } from '../utils'
import axiosInstance from '../../axios/request'
import eventBus from '../../token/event'

import {useIntersection} from '../utils'
import { setSelectedMenuIndex } from "../../store/modules/menuSlice";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "../../type/customTypes";

interface FieldForm {
  firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    message: string,
    subscribe: boolean,
    isFirstNameInvalid: boolean,
    isLastNameInvalid: boolean,
    isEmailInvalid: boolean,
    isPhoneNumberInvalid: boolean,
    isMessageInvalid: boolean,
}

function Contact() {

  const myHref: string = 'target-contact'

  const { menuList } = useSelector((state: RootState) => state.menus);
  const dispatch: AppDispatch = useDispatch();

  const contactRef = useIntersection(
    {
      rootMargin: "-500px",
    },
    (inView) => {
      if (inView) {
        (menuList as MenuItem[]).forEach((menu) => {
          if (menu.href === myHref) {
            dispatch(setSelectedMenuIndex(menu.id));
            // console.log('进入 contact 视图')
          }
        });
      }
    }
  );


  const [fieldsState, setFieldsState] = useState<FieldForm>({
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
  })
  
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [jwtToken, setJwtToken] = useState('')

  

  useEffect(() => {
    eventBus.addListener("synToken", handleTokenEvent);

    return () => {
      eventBus.removeListener("synToken", handleTokenEvent);
    };
  });

  const handleTokenEvent = (jwtToken: string) => {
    setJwtToken(jwtToken)
  }


  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: string; value: string }
    const tempFieldsState: FieldForm = {...fieldsState}
    if (name === 'subscribe') {
      tempFieldsState[name] = (e.target as HTMLInputElement).checked
    } else {
      (tempFieldsState[name as keyof Omit<FieldForm, 'subscribe'>] as string) = value;
      (tempFieldsState['is' + capitalize(name) + 'Invalid'  as keyof FieldForm] as boolean)  = false
    }
    setFieldsState(tempFieldsState)
  }

  /**
   * Submit the contact form.
   * @returns 
   */
  const handleSubmit = () => {
    if (!validateFields()) return false
    setIsLoading(true)

    const contactData = {
      firstName: fieldsState.firstName,
      lastName: fieldsState.lastName,
      email: fieldsState.email,
      phoneNumber: fieldsState.phoneNumber,
      message: fieldsState.message,
      subscribe: fieldsState.subscribe,
    }
    console.log(contactData)
    const formData = new FormData();
    formData.append(
      "contactMe",
      new Blob([JSON.stringify(contactData)], { type: "application/json" })
    );

    // console.log(contactData)
    axiosInstance.post("/sendMessage", formData, {
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    })
    .then((response) => {
      const statusCode = response.status
      if(statusCode === 201) {
        updatePops()
        setIsLoading(false)
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
  const validateFields = () => {
    // console.log(fieldsState)
    const { firstName, lastName, email, phoneNumber, message } = fieldsState
    const tempFieldsState = {...fieldsState}
    if (firstName.trim() === '') {
      tempFieldsState.isFirstNameInvalid = true
      setFieldsState(tempFieldsState)
      return false
    }
    if (lastName.trim() === '') {
      tempFieldsState.isLastNameInvalid = true
      setFieldsState(tempFieldsState)
      return false
    }

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const emailInvalid = (value: string) => {
      if (value.trim() === '') return true
      return validateEmail(value) ? false : true
    }
    if (emailInvalid(email)) {
      tempFieldsState.isEmailInvalid = true
      setFieldsState(tempFieldsState)
      return false
    }

    const validatePhone = (value: string) => value.match(/^\+|0\d+$/)
    const phoneInvalid = (value: string) => {
      if (value.trim() === '') return false
      return validatePhone(value) ? false : true
    }
    if(phoneNumber) {
      if (phoneInvalid(phoneNumber)) {
        tempFieldsState.isPhoneNumberInvalid = true
        setFieldsState(tempFieldsState)
        return false
      }
    }


    if (message.trim() === '') {
      tempFieldsState.isMessageInvalid = true
      setFieldsState(tempFieldsState)
      return false
    }

    return true
  }

  /**
   * open Pop tips and close it after 2 seconds.
   */
  const updatePops = () => {
    setIsOpen(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }
    return (
      <div  className='w-full pt-16 h-auto'>
        <p className='font-georgian text-5xl lg:text-7xl text-center mb-8'>get in touch.</p>
        <p className='w-5/6 font-sans pb-16 text-center text-base word-spacing-wider tracking-widest mx-auto'>download & print. bring street art into your home.</p>

        <div className='w-full h-auto relative pt-2 pb-6 bg-pink-400'>
          <div className='pb-10 w-11/12 lg:w-4/5 xl:w-2/3 2xl:xl:w-2/3 h-auto mx-auto bg-white rounded-lg drop-shadow-lg'>
            <div className='px-6 lg:px-28 pt-8 lg:pt-12'>
              <div ref={contactRef} className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                <Input type='text' label='First Name' placeholder="Enter your first name" className='border-none'
                  isRequired
                  name='firstName'
                  value={fieldsState.firstName}
                  isInvalid={fieldsState.isFirstNameInvalid}
                  errorMessage='Please provide your first name.'
                  onChange={handleInput}
                />
                <Input type='text' label='Last Name' placeholder="Enter your last name"
                  isRequired
                  name='lastName'
                  value={fieldsState.lastName}
                  isInvalid={fieldsState.isLastNameInvalid}
                  errorMessage='Please provide your last name.'
                  onChange={handleInput}
                />
              </div>
              <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8'>
                <Input type='email' label='Email' placeholder="Enter your email" className='border-none'
                  isRequired
                  name='email'
                  value={fieldsState.email}
                  isInvalid={fieldsState.isEmailInvalid}
                  errorMessage='Please provide your email address.'
                  onChange={handleInput}
                  startContent={
                    <MailIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input type='text' label='Phone Number (Optional)' placeholder="Enter your phone number"
                  name='phoneNumber'
                  value={fieldsState.phoneNumber}
                  isInvalid={fieldsState.isPhoneNumberInvalid}
                  errorMessage='Please provide a correct phone number format.'
                  onChange={handleInput}
                  startContent={
                    <PhoneIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>

              <div className='mt-8'>
                <Textarea label='Message' placeholder='What do you have in your mind?'
                  name='message'
                  isInvalid={fieldsState.isMessageInvalid}
                  errorMessage='Please write what you want to say.'
                  value={fieldsState.message}
                  onChange={handleInput}
                />
              </div>
              <div className='mt-2'>
                <Checkbox size='sm' defaultSelected={fieldsState.subscribe}
                  name='subscribe'
                  value={fieldsState.subscribe+''}
                  isSelected={fieldsState.subscribe}
                  onChange={handleInput}
                >
                  Subscribe me to receive my latestwork.
                </Checkbox>
              </div>

              <div className='mt-10 w-full flex justify-end'>
                <Popover placement="bottom" showArrow={true} isOpen={isOpen} backdrop='opaque'>
                  <PopoverTrigger>
                    <Button
                      startContent={<HeartIcon width='20px' height='20px' />}
                      isLoading={isLoading}
                      className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
                      onClick={handleSubmit}
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

export default Contact
