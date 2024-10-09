import React, { useState } from 'react'
import { Image, useDisclosure } from "@nextui-org/react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ImgDetail from './imgDetail';

function ImgsRender(props) {
    const { size, data} = props
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [paintWork, setPaintWork] = useState(null)

    const handleImgDetails = (paintWork) => {
        setPaintWork(paintWork)
        onOpen()
    }

    let returnElements = null

    switch (size) {
        case 'lg':
            {
                // const { paintWorks_col1, paintWorks_col2, paintWorks_col3 } = data
                returnElements = <div className='w-[98%] mx-auto grid grid-cols-3 gap-x-6'>
                    {
                        data.map((paintWorks_col, index_col) => {
                            // Need to explicitly return the outer map's JSX block
                            return (
                                <div className='flex flex-col' key={index_col}>
                                    {
                                        paintWorks_col.map((item, index) => {
                                            return (
                                                <div className='font-light pt-10' key={index}>
                                                    <PhotoProvider>
                                                        <PhotoView key={index} src={item.imageURL}>
                                                            <Image
                                                                radius='sm'
                                                                isZoomed
                                                                isBlurred
                                                                alt="My Painting Art."
                                                                src={item.imageURL}
                                                                fallbackSrc="https://via.placeholder.com/300x200"
                                                                key={index}
                                                            />
                                                            {/* Add more Images here for group view.*/}
                                                        </PhotoView>
                                                    </PhotoProvider>
                                                    <div className='mt-4 flex flex-col' onClick={() => handleImgDetails(item)}>
                                                        <div className='flex flex-row'>
                                                            <p className='w-full text-left cursor-pointer hover:underline tracking-wide hover:text-blue-500'>{item.title}</p>
                                                            <p className='w-full text-right cursor-pointer'>${item.price}.</p>
                                                        </div>
                                                        <div className='text-right text-small text-gray-400 cursor-pointer'>{item.dimensionWidth}mm X {item.dimensionHeight}mm</div>
                                                    </div>

                                                </div>
                                            );
                                        })
                                    }
                                </div>

                            );
                        })
                    }
                    <ImgDetail
                        isOpen={isOpen}
                        onClose={onClose}
                        paintWork={paintWork}
                    />
                </div>
                break
            }
        case 'sm':
            {
                returnElements =
                    <div className='w-[98%] mx-auto grid grid-cols-1 gap-y-6'>
                        <div className='flex flex-col px-2'>
                            {
                                data.map((item, index) => {
                                    return (
                                        <div className='font-light pt-8' key={index}>
                                            <PhotoProvider>
                                                <PhotoView key={index} src={item.imageURL}>
                                                    <Image
                                                radius='sm'
                                                // isZoomed
                                                isBlurred
                                                alt={item.title}
                                                src={item.imageURL}
                                                fallbackSrc="https://via.placeholder.com/300x200"
                                                key={index}
                                            />
                                                    {/* <img src={item.imageURL} alt='' /> */}
                                                </PhotoView>
                                            </PhotoProvider>
                                            <div className='mt-4 flex flex-col' onClick={() => handleImgDetails(item)}>
                                                <div className='flex flex-row'>
                                                    <p className='w-full text-left cursor-pointer hover:underline tracking-wide hover:text-blue-500'>{item.title}</p>
                                                    <p className='w-full text-right cursor-pointer'>${item.price}.</p>
                                                </div>
                                                <div className='flex flex-row mt-1'>
                                                    <div className='basis-1/2 text-left text-small w-full text-gray-400'>
                                                        {item.dimensionWidth}mm X {item.dimensionHeight}mm
                                                    </div>
                                                    <div className='basis-1/2 text-right'>{'Details >'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ImgDetail
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            paintWork={paintWork}
                        />
                    </div>
                break
            }

        default:
            returnElements = <div></div>
            break
    }

    return returnElements
}

export default ImgsRender
