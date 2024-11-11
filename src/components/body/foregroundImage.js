import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/request";
import eventBus from "../../token/event";
import { Image } from "@nextui-org/react";

export function ForegroundImage(props) {
  const { foregroundImageSrc, setForegroundImageSrc } = props

  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    if (jwtToken === "") {
      eventBus.addListener("synToken", handleTokenEvent);
      return () => {
        eventBus.removeListener("synToken", handleTokenEvent);
      };
    }
  });

  useEffect(()=>{
    if(jwtToken !== "" && foregroundImageSrc === "") {
      loadForegroundImage(jwtToken);
    }
  })

  const handleTokenEvent = (jwtToken) => {
    setJwtToken(jwtToken);
  };

  const loadForegroundImage = (jwtToken) => {
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
          }
        });
    }
  };

  return (
    <>
      <Image className="w-screen h-full rounded-none" src={foregroundImageSrc} alt="logo" />
    </>
  );
}

export default ForegroundImage;
