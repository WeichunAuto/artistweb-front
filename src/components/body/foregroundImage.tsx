import { useEffect, memo } from "react";
import axiosInstance from "../../axios/request";

import { Image } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setIsForeGroundImageRended } from "../../store/modules/sectionRenderStatusSlice";


const ForegroundImage = memo(function (props: {
  foregroundImageSrc: string;
  setForegroundImageSrc: (imgSrc: string) => void;
}) {
  const { foregroundImageSrc, setForegroundImageSrc } = props;
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);
  const dispatch: AppDispatch = useDispatch();
  

  useEffect(() => {
    const loadForegroundImage = (jwtToken: string) => {
      if (foregroundImageSrc === "") {
        axiosInstance
          .get("/fetchSavedForegroundImage/image", {
            responseType: "blob",
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          })
          .then((response) => {
            const statusCode = response.status;
            if (statusCode === 200) {
              const imageURL = URL.createObjectURL(response.data);
              setForegroundImageSrc(imageURL);
              dispatch(setIsForeGroundImageRended(true)) // let the next section know this section is rendered
            } else if(statusCode === 404) {
              dispatch(setIsForeGroundImageRended(true)) // let the next section know this section is rendered
            }
          });
      }
    };

    if (jwtToken !== "" && foregroundImageSrc === "") {
      loadForegroundImage(jwtToken);
    }
  }, [jwtToken, foregroundImageSrc, setForegroundImageSrc, dispatch]);


  return (
    <>
      {foregroundImageSrc !== "" ? (
        <Image
          className={`w-screen h-auto rounded-none`}
          src={foregroundImageSrc}
          alt="foregroundImage"
        />
      ) : (
        <></>
      )}
    </>
  );
});

export default ForegroundImage;
