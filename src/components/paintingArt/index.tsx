import { useState, useEffect } from 'react'
import axiosInstance from '../../axios/request'
import eventBus from '../../token/event';
import ImgsRender from './imgsRender';
import LoadingAnimation from '../loadingAnimation';
import {useIntersection} from '../utils'
import { setSelectedMenuIndex } from "../../store/modules/menuSlice";
import { RootState, AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "../../type/customTypes";

interface PaintWork {
  id: number,
  title: string,
  description: string,
  price: number,
  status: string,
  date: string,
  year: string,
  dimensionWidth: number,
  dimensionHeight: number,
  decorationCount: number,
  imageURL?: string
}

function PArt() {

  const myHref: string = 'target-paint'

  const { menuList } = useSelector((state: RootState) => state.menus);
  const dispatch: AppDispatch = useDispatch();

  const paintRef = useIntersection(
    {
      rootMargin: "-700px",
    },
    (inView) => {
      if (inView) {
        (menuList as MenuItem[]).forEach((menu) => {
          if (menu.href === myHref) {
            dispatch(setSelectedMenuIndex(menu.id));
            console.log('进入 paint 视图')
          }
        });
      }
    }
  );

  const [paintWorks, setPaintWorks] = useState<PaintWork[]>([])
  const [paintWorks_col1, setPaintWorks_col1] = useState<PaintWork[]>([])
  const [paintWorks_col2, setPaintWorks_col2] = useState<PaintWork[]>([])
  const [paintWorks_col3, setPaintWorks_col3] = useState<PaintWork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  
  useEffect(() => {
    eventBus.addListener("synToken", handleTokenEvent);
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      eventBus.removeListener("synToken", handleTokenEvent);
      // window.removeEventListener('resize', handleWindowSizeChange)
    };
  });
  
  const handleTokenEvent = (jwtToken: string) => {
    setIsLoading(true)
    loadPaintWorks(jwtToken)
  }

  const handleWindowSizeChange = () => {
    setScreenWidth(window.innerWidth)
  }

  

  const loadPaintWorks = async (jwtToken: string) => {
    const response = await axiosInstance.get('/fetchPaintWorks',{
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    })
    const statusCode = response.status
    if(statusCode === 200) {
        let i = 1
        const mainData = response.data
        let tempPaintWorks_col1: PaintWork[] = []
        let tempPaintWorks_col2: PaintWork[] = []
        let tempPaintWorks_col3: PaintWork[] = []

        const updatedMainData = await Promise.all(
          mainData.map(async (aPaintWork: PaintWork) => {
            try {
              const response = await axiosInstance.get(`/getPaintWorkCover/${aPaintWork.id}/image`, {responseType: "blob"})
              const imageURL = URL.createObjectURL(response.data);
              // console.log(imageURL)
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
        setPaintWorks(updatedMainData)
        setPaintWorks_col1(tempPaintWorks_col1)
        setPaintWorks_col2(tempPaintWorks_col2)
        setPaintWorks_col3(tempPaintWorks_col3)
        setIsLoading(false)
        // console.log(updatedMainData)

    } else {
      console.log('request error.')
    }
  }

    return (
      isLoading 
      ? 
      <LoadingAnimation />
      :
      <div ref={paintRef} className='w-full pt-16'>
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
  


export default PArt