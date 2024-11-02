import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
  Spacer,
} from "@nextui-org/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../css/custom-gallery-thumb.css";

export default function ImgDetail(props) {
  const { isOpen, onClose, paintWork, items } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const closeModal = () => {
    setActiveIndex(0)
    onClose()
  }

  return (
    <>
      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={closeModal}
        placement="bottom"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-normal text-base">
                {/* {'< back'} */}
                <Button
                  className="w-16 text-pink-400"
                  color="primary"
                  variant="light"
                  onPress={closeModal}
                >
                  {"< back"}
                </Button>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 px-2 lg:px-12">
                  <div>
                    <ImageGallery
                      items={items}
                      lazyLoad={true}
                      showIndex={false}
                      disableThumbnailScroll={false}
                      showThumbnails={true}
                      showPlayButton={false}
                      showNav={false}
                      showFullscreenButton={false}
                      slideOnThumbnailOver={false}
                      thumbnailPosition="top"
                      onSlide={(index) => setActiveIndex(index)}
                      renderThumbInner={(item) => {
                        const index = items.indexOf(item); // Find the index of the current item
                        return (
                          <div
                            className={`size-20 rounded-md p-2 flex flex-row justify-center border-2 ${
                              index === activeIndex ? "border-pink-400" : "border-gray-100"
                            }`}
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.originalAlt}
                              className="h-full rounded-md"
                            />
                          </div>
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col pr-10 pt-8 lg:pt-0">
                    <p className="text-left text-2xl word-spacing-wide">
                      {paintWork.title}
                    </p>
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <p className=" mb-2 text-large text-right">
                      <span className="">${paintWork.price}</span>
                    </p>
                    <div className="flex">
                      <p className="">Availability: </p>
                      <Spacer x={4} />
                      <p className="text-green-700"> In Stock</p>
                    </div>

                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <p>{paintWork.description}</p>
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <div className="flex">
                      <p className="">Dimension: </p>
                      <Spacer x={4} />
                      <p className="text-gray-400 text-sm content-end">
                        {" "}
                        {paintWork.dimensionWidth} X {paintWork.dimensionHeight}
                        mm
                      </p>
                    </div>
                    <div className="flex mt-2 mb-10">
                      <p className="w-20">Year: </p>
                      <Spacer x={4} />
                      <p className="text-gray-400 text-sm content-end">
                        {" "}
                        {paintWork.year}
                      </p>
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
