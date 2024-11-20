import { useEffect, memo } from "react";
import axiosInstance from "../../axios/request";
import { Image } from "@nextui-org/react";
import { PaintWork } from "../../type/customTypes";
import PaintWorkLoadingSckleton from "./paintWorkLoadingSckleton";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { updatePaintWorkCoverURL, fetchPaintWorks } from "../../store/modules/paintWorkSlice";


interface Iprops {
  paintWork: PaintWork;
  setIsShowGallery: (isShowGallery: boolean) => void;
  setGalleryPaintWorkId: (galleryPaintWorkId: number) => void;

  setPaintWorkForDetail: (paintWork: PaintWork) => void;
  onPaintWorkDetailOpen: () => void;

  observed: string;
  pageSize: number;
  pageNum: number;
  setPageNum: (pageNum: number) => void;
}

const dynamicImage = memo(function (props: Iprops) {
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);
//   const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);
  const {maxPageNum} = useSelector((state: RootState) => state.paintWorks)

  const dispatch: AppDispatch = useDispatch();
  const {
    paintWork,
    setIsShowGallery,
    setGalleryPaintWorkId,
    setPaintWorkForDetail,
    onPaintWorkDetailOpen,

    observed,
    pageSize,
    pageNum,
    setPageNum,
  } = props;

  useEffect(() => {
    const fetchPaintWorkCover = async () => {
      try {
        const response = await axiosInstance.get(
          `/getPaintWorkCover/${paintWork.id}/image`,
          {
            responseType: "blob",
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          }
        );
        if (response.status === 200) {
          const coverURL = URL.createObjectURL(response.data);
          dispatch(
            updatePaintWorkCoverURL({ id: paintWork.id, coverURL: coverURL })
          );
        }
      } catch (error) {
        console.error(`Failed to fetch image for ID ${paintWork.id}`, error);
      }
    };
    if (jwtToken !== "") {
      if (paintWork.coverURL === "") {
        fetchPaintWorkCover();
      }
    }
  }, [paintWork, jwtToken]);

  const openGallery = (paintWorkId: number) => {
    setGalleryPaintWorkId(paintWorkId);
    setIsShowGallery(true); // open the gallery
  };

  const openPaintWorkDetails = (paintWork: PaintWork) => {
    setPaintWorkForDetail(paintWork);
    onPaintWorkDetailOpen();
  };

  const loadNewDynamicImages = () => {
    const nextPageNum = pageNum+1
    // console.log(nextPageNum, maxPageNum)
    if(nextPageNum <= maxPageNum) {
        setPageNum(nextPageNum)
        dispatch(fetchPaintWorks(pageSize, nextPageNum, jwtToken));
    }
  };

  let lastSecondObserver: IntersectionObserver;

  if (observed === "Y") {
    lastSecondObserver = new IntersectionObserver(
      (entryies) => {
        const observedDiv = entryies[0];
        if (observedDiv.isIntersecting) {
          lastSecondObserver.unobserve(observedDiv.target); 
          loadNewDynamicImages();
        } else {
          return; 
        }
      },
      {}
    );
  }

  useEffect(() => {
    if (paintWork.coverURL !== '') {
      const observedElement = document.getElementById(`${paintWork.id}`);
      
      if(observed === 'Y' && observedElement) {
        lastSecondObserver.observe(observedElement)
      }
        
    }
  }, [paintWork.coverURL]);

  return paintWork.coverURL !== "" ? (
    <div id={`${paintWork.id}`} title={observed} className="font-light pt-10">
      <Image
        radius="sm"
        isZoomed
        isBlurred
        alt="My Painting Art."
        src={paintWork.coverURL}
        //   fallbackSrc="https://via.placeholder.com/300x200"
        className="min-h-[200px] border-2"
        onClick={() => openGallery(paintWork.id)}
      />
      <div
        className="mt-4 flex flex-col"
        onClick={() => openPaintWorkDetails(paintWork)}
      >
        <div className="flex flex-row">
          <p className="w-full text-left cursor-pointer hover:underline tracking-wide hover:text-blue-500">
            {paintWork.title}
          </p>
          <p className="w-full text-right cursor-pointer">
            ${paintWork.price}.
          </p>
        </div>
        <div className="text-right text-small text-gray-400 cursor-pointer">
          {paintWork.dimensionWidth}mm X {paintWork.dimensionHeight}
        </div>
      </div>
    </div>
  ) : (
    <PaintWorkLoadingSckleton />
  );
});

export default dynamicImage;
