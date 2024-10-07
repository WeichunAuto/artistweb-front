import React, { Component } from 'react'
import {Color} from '../../config'
import axiosInstance from '../../axios/request'
import eventBus from '../../token/event';

import {Image} from "@nextui-org/react";
// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import Msg from '../../imgs/msg.png'
import PImg_1 from '../../imgs/part-1.webp'
import PImg_2 from '../../imgs/part-2.jpg'
import PImg_3 from '../../imgs/part-3.webp'
import PImg_4 from '../../imgs/part-4.jpg'
import PImg_5 from '../../imgs/part-5.jpg'
import PImg_6 from '../../imgs/part-6.jpg'

export class PArt extends Component {

  state = {
    paintWorks_col1: [],
    paintWorks_col2: [],
    paintWorks_col3: [],
  }
  
  async componentDidMount() {
    eventBus.addListener('synToken', (jwtToken) => {
      this.loadPaintWorks(jwtToken)
    })
  }

  loadPaintWorks = async (jwtToken) => {
    const response = await axiosInstance.get('/fetchPaintWorks',{
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    })
    const statusCode = response.status
    if(statusCode === 200) {
        let i = 1
        const mainData = response.data
        let tempPaintWorks_col1 = []
        let tempPaintWorks_col2 = []
        let tempPaintWorks_col3 = []

        const updatedMainData = await Promise.all(
          mainData.map(async (aPaintWork) => {
            try {
              const response = await axiosInstance.get(`/getAPaintWork/${aPaintWork.id}/image`, {responseType: "blob"})
              const imageURL = URL.createObjectURL(response.data);
              const tempAPaintWork = { ...aPaintWork, imageURL }
              if(i === 1) {
                tempPaintWorks_col1.push(tempAPaintWork)
                i = 2
              } else if(i === 2) {
                tempPaintWorks_col2.push(tempAPaintWork)
                i = 3
              } else if(i === 3) {
                tempPaintWorks_col3.push(tempAPaintWork)
                i = 1
              }
              // return { ...aPaintWork, imageURL }
            } catch (error) {
              console.error(
                "Error fetching image for aPaintWork ID:",
                aPaintWork.id,
                error
              );
              // return { ...aPaintWork, imageUrl: "" };
            }
          })
        )
        this.setState({
          paintWorks_col1: tempPaintWorks_col1,
          paintWorks_col2: tempPaintWorks_col2,
          paintWorks_col3: tempPaintWorks_col3,
        })
    } else {
      console.log('request error.')
    }
  }

  render() { 
    const {paintWorks_col1, paintWorks_col2, paintWorks_col3} = this.state
    return (
      <div className='w-screen lg:min-w-[1200px] pt-16'>
        <p className='font-georgian text-5xl lg:text-7xl text-center mb-8'>painting art.</p>
        <p className='w-5/6 font-sans pb-16 text-center text-base word-spacing-wider tracking-widest mx-auto'>download & print. bring street art into your home.</p>

        <div className='w-screen h-auto'>
          <div className='w-[98%] mx-auto grid grid-cols-3 gap-x-4'>

            {/* the first col */}
            <div className='flex flex-col'>
                <div className='font-light'>
                  <Image
                    radius='sm'
                    isZoomed
                    isBlurred
                    alt="NextUI hero Image with delay"
                    src={PImg_1}
                    fallbackSrc="https://via.placeholder.com/300x200"
                  />
                  <p className='mt-4'>I'M AN ART WORK.</p>
                  <p>$155.00.</p>
                </div>
                <div className='font-light'>
                  <Image
                    radius='sm'
                    isZoomed
                    isBlurred
                    alt="NextUI hero Image with delay"
                    src={PImg_4}
                    fallbackSrc="https://via.placeholder.com/300x200"
                  />
                  <p className='mt-4'>I'M AN ART WORK.</p>
                  <p>$155.00.</p>
                </div>
            </div>
            {/* the second col */}
            <div className='flex flex-col'>
                <div className='font-light'>
                  <Image
                    radius='sm'
                    isZoomed
                    isBlurred
                    alt="NextUI hero Image with delay"
                    src={PImg_3}
                    fallbackSrc="https://via.placeholder.com/300x200"
                  />
                  <p className='mt-4'>I'M AN ART WORK.</p>
                  <p>$155.00.</p>
                </div>
                <div className='font-light'>
                  <Image
                    radius='sm'
                    isZoomed
                    isBlurred
                    alt="NextUI hero Image with delay"
                    src={PImg_5}
                    fallbackSrc="https://via.placeholder.com/300x200"
                  />
                  <p className='mt-4'>I'M AN ART WORK.</p>
                  <p>$155.00.</p>
                </div>
            </div>

            {/* the third col */}
            <div className='flex flex-col'>
              <div className='font-light'>
                <Image
                  radius='sm'
                  isZoomed
                  isBlurred
                  alt="NextUI hero Image with delay"
                  src={PImg_2}
                  fallbackSrc="https://via.placeholder.com/300x200"
                />
                <p className='mt-4'>I'M AN ART WORK.</p>
                <p>$155.00.</p>
              </div>
              <div className='font-light'>
                <Image
                  radius='sm'
                  isZoomed
                  isBlurred
                  alt="NextUI hero Image with delay"
                  src={PImg_6}
                  fallbackSrc="https://via.placeholder.com/300x200"
                />
                <p className='mt-4'>I'M AN ART WORK.</p>
                <p>$155.00.</p>
              </div>
            </div>


            {/* <div className='font-light'>
              <Image
                radius='sm'
                isZoomed
                
                alt="NextUI hero Image with delay"
                src={PImg_4}
                fallbackSrc="https://via.placeholder.com/300x200"
              />
              <p className='mt-4'>I'M AN ART WORK.</p>
              <p>$155.00.</p>
            </div>

            <div className='font-light'>
              <Image
                radius='sm'
                isZoomed
                isBlurred
                alt="NextUI hero Image with delay"
                src={PImg_5}
                fallbackSrc="https://via.placeholder.com/300x200"
              />
              <p className='mt-4'>I'M AN ART WORK.</p>
              <p>$155.00.</p>
            </div>

            <div className='font-light'>
              <Image
                radius='sm'
                isZoomed
                isBlurred
                alt="NextUI hero Image with delay"
                src={PImg_6}
                fallbackSrc="https://via.placeholder.com/300x200"
              />
              <p className='mt-4'>I'M AN ART WORK.</p>
              <p>$155.00.</p>
            </div> */}
          </div>
          
        </div>
      </div>
      
    )
  }

  /**
   * fetch the about me data with carrying token.
   * @param {*} token 
   * @returns 
   */
  async requestAboutMe(token) {
    try {
      const aboutMeRes = await axiosInstance.post('/aboutme',{}, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      return aboutMeRes.data
      
    } catch (error) {
      console.log(error)
      return null
    }
  }

  /**
   * fetch the unique values with carrying token.
   * @param {*} token 
   * @returns 
   */
  async requestUniqueValuesRes(token) {
    try {
      const uniqueValuesRes = await axiosInstance.post('/uniqueValues',{}, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      return uniqueValuesRes.data
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  
}

export default PArt