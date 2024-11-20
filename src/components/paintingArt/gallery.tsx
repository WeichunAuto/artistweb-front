import { useState, useEffect, memo } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { CloseIcon } from "../body/icons";
import { RootState, AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentDecoration,
  fetchCurrentDecoration,
} from "../../store/modules/cacheDecorationsSlice";
import ImageLoadingAnimation from "../../animation/imageLoadingAnimation";

const gallery = memo(function (props: {
  galleryPaintWorkId: number;
  isShowGallery: boolean;
  setIsShowGallery: (isShowGallery: boolean) => void;
}) {
  const { galleryPaintWorkId, isShowGallery, setIsShowGallery } = props;
  const { currentDecoration, cachedDecorations } = useSelector(
    (state: RootState) => state.cachedDecorations
  );
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);
  const dispatch: AppDispatch = useDispatch();

  const [isShowLoading, setIsShowLoading] = useState(false);

  useEffect(() => {
    if (galleryPaintWorkId !== 0) {
      const cachedDecoration = cachedDecorations[galleryPaintWorkId];
      if (cachedDecoration) {
        dispatch(setCurrentDecoration(cachedDecoration));
      } else {
        setIsShowLoading(true);
        dispatch(fetchCurrentDecoration(galleryPaintWorkId, jwtToken));
      }
    }
  }, [galleryPaintWorkId, dispatch, jwtToken]);

  useEffect(() => {
    setIsShowLoading(false);
  }, [currentDecoration]);

  if (isShowGallery) {
    if (isShowLoading) {
      return (
        <ImageLoadingAnimation
          setIsShowGallery={setIsShowGallery}
          setIsShowLoading={setIsShowLoading}
        />
      );
    } else {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: "0",
            top: "0",
            margin: "0",
            padding: "0",
            backgroundColor: "black",
            zIndex: 100000,
            overflow: "hidden",
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
            <CloseIcon className="w-6 lg:w-10" />
          </p>

          <ImageGallery
            items={currentDecoration}
            lazyLoad={true}
            showIndex={true}
            disableThumbnailScroll={true}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>
      );
    }
  } else {
    return <></>;
  }
});

export default gallery;
