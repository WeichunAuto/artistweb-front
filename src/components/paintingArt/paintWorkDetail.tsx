import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
  Spacer,
} from "@nextui-org/react";
// import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../css/custom-gallery-thumb.css";
import DecorationsPreview from "./decorationsPreview";
import DecorationsPreviewSckleton from "./decorationsPreviewSckleton";
import { PaintWork } from "../../type/customTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  setCurrentDecoration,
  fetchCurrentDecoration,
} from "../../store/modules/cacheDecorationsSlice";

interface IProps {
  isPaintWorkDetailOpen: boolean;
  onPaintWorkDetailClose: () => void;
  paintWork: PaintWork | undefined;
}

export default function PaintWorkDetail(props: IProps) {
  const {
    isPaintWorkDetailOpen,
    onPaintWorkDetailClose,
    paintWork,
  } = props;

  const dispatch = useDispatch<AppDispatch>();
  const { currentDecoration, cachedDecorations } = useSelector(
    (state: RootState) => state.cachedDecorations
  );
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);
  const [isShowLoading, setIsShowLoading] = useState(false);

  useEffect(() => {
    if (paintWork) {
      const cachedDecoration = cachedDecorations[paintWork.id];
      if (cachedDecoration) {
        dispatch(setCurrentDecoration(cachedDecoration));
        setIsShowLoading(false)
      } else {
        setIsShowLoading(true)
        dispatch(fetchCurrentDecoration(paintWork.id, jwtToken));
      }
    }
  }, [paintWork, dispatch, jwtToken]);

  useEffect(() => {
    setIsShowLoading(false)
  }, [currentDecoration])

  const closeModal = () => {
    onPaintWorkDetailClose();
  };

  return (
    <>
      <Modal
        size="full"
        scrollBehavior="inside"
        isOpen={isPaintWorkDetailOpen}
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
                {isShowLoading ? <DecorationsPreviewSckleton /> : <DecorationsPreview decorations={currentDecoration} />}
                  

                  <div className="flex flex-col pr-10 pt-8 lg:pt-0">
                    <p className="text-left text-2xl word-spacing-wide">
                      {paintWork ? paintWork.title : ""}
                    </p>
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <p className=" mb-2 text-large text-right">
                      <span className="">
                        ${paintWork ? paintWork.price : ""}
                      </span>
                    </p>
                    <div className="flex">
                      <p className="">Availability: </p>
                      <Spacer x={4} />
                      <p className="text-green-700"> In Stock</p>
                    </div>

                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <p>{paintWork ? paintWork.description : ""}</p>
                    <Divider orientation="horizontal" className="mt-6 mb-8" />
                    <div className="flex">
                      <p className="">Dimension: </p>
                      <Spacer x={4} />
                      <p className="text-gray-400 text-sm content-end">
                        {" "}
                        {paintWork ? paintWork.dimensionWidth : ""} X{" "}
                        {paintWork ? paintWork.dimensionHeight : ""}
                        mm
                      </p>
                    </div>
                    <div className="flex mt-2 mb-10">
                      <p className="w-20">Year: </p>
                      <Spacer x={4} />
                      <p className="text-gray-400 text-sm content-end">
                        {" "}
                        {paintWork ? paintWork.year : ""}
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
