import { useState, useEffect, memo } from "react";
import axiosInstance from "../../axios/request";
import eventBus from "../../token/event";
import { Image } from "@nextui-org/react";

const Logo = memo(function (props: {
  logoSrc: string;
  setLogoSrc: (logoSrc: string) => void;
}) {

  const logoDefaultSrc = require('../../imgs/logo_default.webp') // default logo

  const { logoSrc, setLogoSrc } = props;

  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    if (jwtToken === "") {
      eventBus.addListener("synToken", handleTokenEvent);
      return () => {
        eventBus.removeListener("synToken", handleTokenEvent);
      };
    }
  });

  useEffect(() => {
    if (jwtToken !== "" && logoSrc === "") {
      loadLogo(jwtToken);
    }
  });

  const handleTokenEvent = (jwtToken: string) => {
    setJwtToken(jwtToken);
  };

  const loadLogo = (jwtToken: string) => {
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
            const imageURL: string = URL.createObjectURL(response.data);
            setLogoSrc(imageURL);
          } else if (statusCode === 404) {
            setLogoSrc('Not Found');
          }
        });
    }
  };

  return (
    <>
        <Image
          className="w-full h-full rounded-none"
          src={logoSrc === 'Not Found' ? logoDefaultSrc : logoSrc}
          alt="logo"
        />
    </>
  );
})


export default Logo;