import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/request";
import eventBus from "../../token/event";
import { Image } from "@nextui-org/react";

export function Logo(props) {
  const { logoSrc, setLogoSrc } = props

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
    if(jwtToken !== "" && logoSrc === "") {
      loadLogo(jwtToken);
    }
  })

  const handleTokenEvent = (jwtToken) => {
    setJwtToken(jwtToken);
  };

  const loadLogo = (jwtToken) => {
    if (logoSrc === "") {
      axiosInstance
        .get("/fetchSavedLogo/image", {
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        })
        .then((response) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            const imageURL = URL.createObjectURL(response.data);
            setLogoSrc(imageURL);
          }
        });
    }
  };

  return (
    <>
      <Image className="w-full h-full rounded-none" src={logoSrc} alt="logo" />
    </>
  );
}

export default Logo;
