import React, { useState, useEffect } from "react";
import eventBus from "../../token/event";
import { Image, useDisclosure } from "@nextui-org/react";
import ImgDetail from "./imgDetail";
import axiosInstance from "../../axios/request";
import Gallery from "./gallery";

function ImgsRender(props) {
  const { size, data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paintWork, setPaintWork] = useState(null);

  const [jwtToken, setJwtToken] = useState("");

  const [cachedGalleryItems, setCachedGalleryItems] = useState({});
  const [galleryItems, setGalleryItems] = useState([]);
  const [isShowGallery, setIsShowGallery] = useState(false);

  useEffect(() => {
    eventBus.addListener("synToken", handleTokenEvent);
    return () => {
      eventBus.removeListener("synToken", handleTokenEvent);
    };
  });

  const handleTokenEvent = (jwtToken) => {
    setJwtToken(jwtToken);
  };

  const handleImgDetails = async (paintWork) => {
    setPaintWork(paintWork);
    await loadDecorations(paintWork.id);
    onOpen();
  };

  /**
   * -> Load decoration photo after clicking a paint work.
   * 1. This function will first get galleryItems from the cache.
   * 2. It will fetch galleryItems from the API if the cache doesn't exist.
   * 3. The newly fetched galleryItems will also be saved into the cache for the next use.
   * @param {*} paintWorkId
   */
  const loadDecorations = async (paintWorkId) => {
    let galleryItems = cachedGalleryItems[paintWorkId];

    if (!galleryItems) {
      // console.log('fetching new....')
      const response = await axiosInstance.get(
        `/fetchDecorations/${paintWorkId}`,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );
      const tempDecorations = response.data;

      galleryItems = await Promise.all(
        tempDecorations.map(async (aDecoration) => {
          try {
            const responseBytes = await axiosInstance.get(
              `/getOrigionalDecorationImage/${aDecoration.id}/image`,
              { responseType: "blob" }
            );
            const imageURL = URL.createObjectURL(responseBytes.data);

            return { original: imageURL, thumbnail: imageURL };
          } catch (error) {
            console.error(
              "Error fetching image for aPaintWork ID:",
              aDecoration.id,
              error
            );
            return { original: "", thumbnail: "" };
          }
        })
      );
      setCachedGalleryItems({
        ...cachedGalleryItems,
        [paintWorkId]: galleryItems,
      }); // put the fetched galerry items into cache.
    }
    setGalleryItems(galleryItems);
  };

  const openGallery = async (paintWorkId) => {
    await loadDecorations(paintWorkId)
    setIsShowGallery(true); // open the gallery
  }

  let returnElements = null;

  switch (size) {
    case "lg": {
      returnElements = (
        <div className="w-[98%] mx-auto grid grid-cols-3 gap-x-6">
          {data.map((paintWorks_col, index_col) => {
            return (
              <div className="flex flex-col" key={index_col}>
                {paintWorks_col.map((item, index) => {
                  return (
                    <div className="font-light pt-10" key={index}>
                      <Image
                        radius="sm"
                        isZoomed
                        isBlurred
                        alt="My Painting Art."
                        src={item.imageURL}
                        fallbackSrc="https://via.placeholder.com/300x200"
                        key={index}
                        loading="lazy"
                        onClick={() => openGallery(item.id)}
                      />

                      <div
                        className="mt-4 flex flex-col"
                        onClick={() => handleImgDetails(item)}
                      >
                        <div className="flex flex-row">
                          <p className="w-full text-left cursor-pointer hover:underline tracking-wide hover:text-blue-500">
                            {item.title}
                          </p>
                          <p className="w-full text-right cursor-pointer">
                            ${item.price}.
                          </p>
                        </div>
                        <div className="text-right text-small text-gray-400 cursor-pointer">
                          {item.dimensionWidth}mm X {item.dimensionHeight}mm
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <ImgDetail
            isOpen={isOpen}
            onClose={onClose}
            paintWork={paintWork}
            items={galleryItems}
          />
          <Gallery
            items={galleryItems}
            isShowGallery={isShowGallery}
            setIsShowGallery={setIsShowGallery}
          />
        </div>
      );
      break;
    }
    case "sm": {
      returnElements = (
        <div className="w-[98%] mx-auto grid grid-cols-1 gap-y-6">
          <div className="flex flex-col px-2">
            {data.map((item, index) => {
              return (
                <div className="font-light pt-8" key={index}>
                  <Image
                    radius="sm"
                    // isZoomed
                    isBlurred
                    alt={item.title}
                    src={item.imageURL}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    key={index}
                    onClick={() => openGallery(item.id)}
                  />

                  <div
                    className="mt-4 flex flex-col"
                    onClick={() => handleImgDetails(item)}
                  >
                    <div className="flex flex-row">
                      <p className="w-full text-left cursor-pointer hover:underline tracking-wide hover:text-blue-500">
                        {item.title}
                      </p>
                      <p className="w-full text-right cursor-pointer">
                        ${item.price}.
                      </p>
                    </div>
                    <div className="flex flex-row mt-1">
                      <div className="basis-1/2 text-left text-small w-full text-gray-400">
                        {item.dimensionWidth}mm X {item.dimensionHeight}mm
                      </div>
                      <div className="basis-1/2 text-right">{"Details >"}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ImgDetail
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            paintWork={paintWork}
            items={galleryItems}
          />
          <Gallery
            items={galleryItems}
            isShowGallery={isShowGallery}
            setIsShowGallery={setIsShowGallery}
          />
        </div>
      );
      break;
    }

    default:
      returnElements = <div></div>;
      break;
  }

  return returnElements;
}

export default ImgsRender;
