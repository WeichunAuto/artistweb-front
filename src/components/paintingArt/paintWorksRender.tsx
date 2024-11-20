import { memo, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchPaintWorks,
  getMaxPageNum,
} from "../../store/modules/paintWorkSlice";
import { setIsPaintWorksSectionRended } from "../../store/modules/sectionRenderStatusSlice";

import { PaintWork } from "../../type/customTypes";
import DynamicImage from "./dynamicImage";
import Gallery from "./gallery";
import PaintWorkDetail from "./paintWorkDetail";
import { useDisclosure } from "@nextui-org/react";

const paintWorksRender = memo(function () {
  const dispatch: AppDispatch = useDispatch();
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);
  const { paintWorks } = useSelector((state: RootState) => state.paintWorks);
  const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);
    // console.log('isSmallScreen = ', isSmallScreen)
  const pageSize = 6

  const [pageNum, setPageNum] = useState(1);

  const smallScreenRef = useRef<HTMLDivElement>(null);

  const [paintWorks_col_1, setPaintWorks_col_1] = useState<PaintWork[]>([]);
  const [paintWorks_col_2, setPaintWorks_col_2] = useState<PaintWork[]>([]);
  const [paintWorks_col_3, setPaintWorks_col_3] = useState<PaintWork[]>([]);

  const [galleryPaintWorkId, setGalleryPaintWorkId] = useState<number>(0);
  const [isShowGallery, setIsShowGallery] = useState(false);

  const {
    isOpen: isPaintWorkDetailOpen,
    onOpen: onPaintWorkDetailOpen,
    onClose: onPaintWorkDetailClose,
  } = useDisclosure();
  const [paintWorkForDetail, setPaintWorkForDetail] = useState<PaintWork>();

  useEffect(() => {
    if (jwtToken !== "" && paintWorks.length === 0) {
      dispatch(fetchPaintWorks(pageSize, pageNum, jwtToken));
      dispatch(getMaxPageNum(pageSize, jwtToken));
    }
  }, [jwtToken, dispatch]);

  useEffect(() => {
    if (!isSmallScreen) {
      // not a small screen
      const temp_col_1: PaintWork[] = [];
      const temp_col_2: PaintWork[] = [];
      const temp_col_3: PaintWork[] = [];

      paintWorks.forEach((paintWork, index) => {
        const mode = index % 3;

        switch (mode) {
          case 0:
            temp_col_1.push(paintWork);
            break;
          case 1:
            temp_col_2.push(paintWork);
            break;
          case 2:
            temp_col_3.push(paintWork);
            break;
          default:
            break;
        }
      });
      setPaintWorks_col_1(temp_col_1);
      setPaintWorks_col_2(temp_col_2);
      setPaintWorks_col_3(temp_col_3);
    }
    dispatch(setIsPaintWorksSectionRended(true))
  }, [isSmallScreen, paintWorks]);

  return isSmallScreen ? (
    <div className="w-[98%] mx-auto grid grid-cols-1 gap-y-6">
      <div ref={smallScreenRef} className="flex flex-col px-2">
        {paintWorks.map((paintWork, index) => (
          <DynamicImage
            paintWork={paintWork}
            key={index}
            setIsShowGallery={setIsShowGallery}
            setGalleryPaintWorkId={setGalleryPaintWorkId}
            setPaintWorkForDetail={setPaintWorkForDetail}
            onPaintWorkDetailOpen={onPaintWorkDetailOpen}
            observed={index === paintWorks.length - 2 ? "Y" : "N"}
            pageSize={pageSize}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        ))}
      </div>
      <Gallery
        galleryPaintWorkId={galleryPaintWorkId}
        isShowGallery={isShowGallery}
        setIsShowGallery={setIsShowGallery}
      />

      <PaintWorkDetail
        isPaintWorkDetailOpen={isPaintWorkDetailOpen}
        onPaintWorkDetailClose={onPaintWorkDetailClose}
        paintWork={paintWorkForDetail}
      />
    </div>
  ) : (
    <div className="w-[98%] mx-auto grid grid-cols-3 gap-x-6">
      <div className="flex flex-col">
        {(paintWorks_col_1 as PaintWork[]).map((paintWork, index) => (
          <DynamicImage
            paintWork={paintWork}
            key={index}
            setIsShowGallery={setIsShowGallery}
            setGalleryPaintWorkId={setGalleryPaintWorkId}
            setPaintWorkForDetail={setPaintWorkForDetail}
            onPaintWorkDetailOpen={onPaintWorkDetailOpen}
            observed='N'
            pageSize={pageSize}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        ))}
      </div>
      <div className="flex flex-col">
        {(paintWorks_col_2 as PaintWork[]).map((paintWork, index) => (
          <DynamicImage
            paintWork={paintWork}
            key={index}
            setIsShowGallery={setIsShowGallery}
            setGalleryPaintWorkId={setGalleryPaintWorkId}
            setPaintWorkForDetail={setPaintWorkForDetail}
            onPaintWorkDetailOpen={onPaintWorkDetailOpen}
            observed='N'
            pageSize={pageSize}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        ))}
      </div>
      <div className="flex flex-col">
        {(paintWorks_col_3 as PaintWork[]).map((paintWork, index) => (
          <DynamicImage
            paintWork={paintWork}
            key={index}
            setIsShowGallery={setIsShowGallery}
            setGalleryPaintWorkId={setGalleryPaintWorkId}
            setPaintWorkForDetail={setPaintWorkForDetail}
            onPaintWorkDetailOpen={onPaintWorkDetailOpen}
            observed={((index === paintWorks_col_3.length-2) || (paintWorks_col_3.length-2) === -1) ? 'Y' : 'N'}
            pageSize={pageSize}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        ))}
      </div>
      <Gallery
        galleryPaintWorkId={galleryPaintWorkId}
        isShowGallery={isShowGallery}
        setIsShowGallery={setIsShowGallery}
      />

      <PaintWorkDetail
        isPaintWorkDetailOpen={isPaintWorkDetailOpen}
        onPaintWorkDetailClose={onPaintWorkDetailClose}
        paintWork={paintWorkForDetail}
      />
    </div>
  );
});

export default paintWorksRender;