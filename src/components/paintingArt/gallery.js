import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { CloseIcon } from "../../components/body/icons";

function Gallery(props) {
  const { items, isShowGallery, setIsShowGallery } = props;

  return (
    <>
      {isShowGallery && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: "0",
            top: "0",
            margin:'0',
            padding:'0',
            backgroundColor: "black",
            zIndex: 100000,
            overflow: 'hidden'
          }}
        >
          <p
            style={{
              width: "40px",
              margin: "0",
              marginTop: "3px",
              position: "absolute",
              left: "20px",
              top: "20px",
              cursor: "pointer",
              zIndex: 10000,
            }}
            onClick={() => setIsShowGallery(!isShowGallery)}
          >
            <CloseIcon className='w-6 lg:w-10'/>
          </p>

          <ImageGallery
            items={items}
            lazyLoad={true}
            showIndex={true}
            disableThumbnailScroll={true}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>
      )}
    </>
  );
}

export default Gallery;
