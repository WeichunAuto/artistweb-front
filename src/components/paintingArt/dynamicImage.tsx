import { useState, useEffect } from "react";
import axiosInstance from "../../axios/request";
import { Image } from "@nextui-org/react";
import { PaintWork } from "../../type/customTypes";
import PaintWorkLoadingSckleton from "./paintWorkLoadingSckleton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Iprops {
    paintWork: PaintWork,  
    setIsShowGallery: (isShowGallery:boolean)=>void, 
    setGalleryPaintWorkId: (galleryPaintWorkId:number)=>void

    setPaintWorkForDetail: (paintWork: PaintWork)=>void
    onPaintWorkDetailOpen: ()=>void
}

function DynamicImage(props: Iprops) {
  
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);

  const [imageURL, setImageURL] = useState<string>("");
  const {paintWork, setIsShowGallery, setGalleryPaintWorkId, setPaintWorkForDetail, onPaintWorkDetailOpen} = props;

  useEffect(() => {
    // console.log('dynamic loading images....')
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
          setImageURL(URL.createObjectURL(response.data));
        }
      } catch (error) {
        console.error(`Failed to fetch image for ID ${paintWork.id}`, error);
      }
    };
    if (jwtToken !== "") {
      fetchPaintWorkCover();
    }
  }, [paintWork, jwtToken]);

  const openGallery = (paintWorkId: number) => {
    // console.log('click to open gallery....')
    setGalleryPaintWorkId(paintWorkId)
    setIsShowGallery(true); // open the gallery
  };

  const openPaintWorkDetails = (paintWork: PaintWork) => {
    setPaintWorkForDetail(paintWork)
    onPaintWorkDetailOpen()
  }

  return imageURL !== "" ? (
    <div className="font-light pt-10">
      <Image
        radius="sm"
        isZoomed
        isBlurred
        alt="My Painting Art."
        src={imageURL}
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
}

export default DynamicImage;
