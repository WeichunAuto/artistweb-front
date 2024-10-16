import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Image,Button, Divider, Spacer } from "@nextui-org/react";

export default function ImgDetail(props) {
  const { isOpen, onClose, paintWork } = props

  // console.log(paintWork)

  return (
    <>
      <Modal
        size='full'
        scrollBehavior='inside'
        isOpen={isOpen}
        onClose={onClose}
        placement='bottom'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-normal text-base">
                {/* {'< back'} */}
                <Button className='w-16 text-pink-400' color="primary" variant="light" onPress={onClose}>
                  {'< back'}
                </Button>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 px-2 lg:px-12">
                  <div>
                    <Image
                      radius='none'
                      // isBlurred
                      alt={paintWork.title}
                      src={paintWork.imageURL}
                      fallbackSrc="https://via.placeholder.com/300x200"
                    />
                  </div>
                  <div className="flex flex-col pr-10 pt-8 lg:pt-0">
                    <p className="text-left text-2xl word-spacing-wide">{paintWork.title}</p>
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <p className=" mb-2 text-large text-right"><span className="">${paintWork.price}</span></p>
                    <div className="flex">
                      <p className="">Availability: </p>
                      <Spacer x={4} /> 
                      <p className="text-green-700">  In Stock</p>
                    </div>
                    
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <p>{paintWork.description}</p>
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <div className="flex">
                      <p className="">Dimension: </p>
                      <Spacer x={4} /> 
                      <p className="text-gray-400 text-sm content-end">  {paintWork.dimensionWidth} X {paintWork.dimensionHeight}mm</p>
                    </div>
                    <div className="flex mt-2 mb-10">
                      <p className="w-20">Year: </p>
                      <Spacer x={4} /> 
                      <p className="text-gray-400 text-sm content-end">  {paintWork.year}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
