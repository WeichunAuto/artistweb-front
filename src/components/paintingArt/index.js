import React, { Component } from 'react'
import axiosInstance from '../../axios/request'
import eventBus from '../../token/event';
import ImgsRender from './imgsRender';
import LoadingAnimation from '../loadingAnimation';

export class PArt extends Component {

  state = {
    paintWorks: [],
    paintWorks_col1: [],
    paintWorks_col2: [],
    paintWorks_col3: [],
    isLoading: true,

    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  }
  
  async componentDidMount() {
    eventBus.addListener('synToken', this.handleTokenEvent)
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  handleTokenEvent = (jwtToken) => {
    this.setState({isLoading: true})
    this.loadPaintWorks(jwtToken)
  }

  handleWindowSizeChange = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  }

  componentWillUnmount() {
    eventBus.removeListener('synToken', this.handleTokenEvent)
    window.removeEventListener('resize', this.handleWindowSizeChange)
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
              const response = await axiosInstance.get(`/getPaintWorkCover/${aPaintWork.id}/image`, {responseType: "blob"})
              const imageURL = URL.createObjectURL(response.data);
              console.log(imageURL)
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
              return tempAPaintWork
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
        console.log(updatedMainData)
        this.setState({
          paintWorks: updatedMainData,
          paintWorks_col1: tempPaintWorks_col1,
          paintWorks_col2: tempPaintWorks_col2,
          paintWorks_col3: tempPaintWorks_col3,
          isLoading: false
        })        
    } else {
      console.log('request error.')
    }
  }

  render() { 
    const {paintWorks, paintWorks_col1, paintWorks_col2, paintWorks_col3, screenWidth, isLoading} = this.state

    return (
      isLoading 
      ? 
      <LoadingAnimation />
      :
      <div className='w-full pt-16'>
        <p className='font-georgian text-5xl lg:text-7xl text-center mb-8'>painting art.</p>
        <p className='w-5/6 font-sans pb-16 text-center text-base word-spacing-wider tracking-widest mx-auto'>download & print. bring street art into your home.</p>

        <div className='w-full h-auto'>
            {
              screenWidth > 640 
              ? <ImgsRender size='lg' data={[
                paintWorks_col1,
                paintWorks_col2,
                paintWorks_col3
              ]}
              />
              : <ImgsRender size='sm' data={paintWorks} />
            }
        </div>
      </div>
    )
  }
  
}

export default PArt