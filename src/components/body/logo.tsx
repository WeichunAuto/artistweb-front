import { useEffect, memo } from "react";
import axiosInstance from "../../axios/request";

import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Logo = memo(function (props: {
  logoSrc: string;
  setLogoSrc: (logoSrc: string) => void;
}) {
  // console.log('logo 组件渲染了。。')
  const { jwtToken } = useSelector((state: RootState) => state.jwtToken);

  const logoDefaultSrc = require("../../imgs/logo_default.webp"); // default logo

  const { logoSrc, setLogoSrc } = props;

  useEffect(() => {
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
            } 
          });
      }
    };

    if (jwtToken !== "" && logoSrc === "") {
      loadLogo(jwtToken);
    }
  }, [jwtToken, logoSrc, setLogoSrc]);

  return (
    <>
      <Image
        className="w-full h-full rounded-none"
        src={logoSrc === "" ? logoDefaultSrc : logoSrc}
        alt="logo"
      />
    </>
  );
});

export default Logo;
