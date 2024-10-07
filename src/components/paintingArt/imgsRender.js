import React from 'react'
import { Image } from "@nextui-org/react";
import { PhotoProvider, PhotoView } from 'react-photo-view';

function imgsRender(props) {
    const { size, data } = props

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
                                                <div className='font-light pt-8' key={index}>
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
                                                    <p className='mt-4'>{item.title}</p>
                                                    <p>${item.price}.</p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                            );
                        })

                    }
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
                                                    {/* <Image
                                                radius='sm'
                                                isZoomed
                                                isBlurred
                                                alt="NextUI hero Image with delay"
                                                src={item.imageURL}
                                                fallbackSrc="https://via.placeholder.com/300x200"
                                                key={index}
                                            /> */}
                                                    <img src={item.imageURL} alt='' />
                                                </PhotoView>
                                            </PhotoProvider>
                                            <p className='mt-4'>{item.title}</p>
                                            <p>${item.price}.</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                break
            }

        default:
            returnElements = <div></div>
            break
    }

    return returnElements
}

export default imgsRender
