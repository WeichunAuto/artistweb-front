import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import axiosInstance from "../../axios/request";
import eventBus from "../../token/event";
import SocialMedia from "./socialMedia";

function AboutMe() {
  const [aboutMe, setAboutMe] = useState(null);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    eventBus.addListener("synToken", handleTokenEvent);

    return () => {
      eventBus.removeListener("synToken", handleTokenEvent);
    };
  });

  const handleTokenEvent = (jwtToken) => {
    loadAboutMeData(jwtToken);
    loadTopicsData(jwtToken);
  };

  const loadTopicsData = (jwtToken) => {
    axiosInstance
      .get("/fetchTopics", {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200) {
          loadTopicsImage(jwtToken, response.data);
        }
      });
  };

  const loadTopicsImage = (jwtToken, tempTopicsData) => {
    if (tempTopicsData.length > 0) {
      (async () => {
        const updatedMainData = await Promise.all(
          tempTopicsData.map(async (aTopic) => {
            try {
              const response = await axiosInstance.get(
                `/getATopic/${aTopic.id}/image`,
                {
                  responseType: "blob",
                  headers: {
                    Authorization: "Bearer " + jwtToken,
                  },
                }
              );
              const imageURL = URL.createObjectURL(response.data);
              return { ...aTopic, imageURL };
            } catch (error) {
              console.error(
                "Error fetching image for aPaintWork ID:",
                aTopic.id,
                error
              );
              return { ...aTopic, imageURL: "" };
            }
          })
        );
        setTopics(updatedMainData);
      })();
    }
  };

  const loadAboutMeData = async (jwtToken) => {
    const response = await axiosInstance.get("/fetchAboutMe", {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });
    const statusCode = response.status;
    if (statusCode === 200) {
      const aboutMeTempData = response.data;
      const imageURL = await getProfilePhoto(aboutMeTempData.id, jwtToken);
      setAboutMe({ ...aboutMeTempData, imageURL });
    }
  };

  const getProfilePhoto = async (id, jwtToken) => {
    let imageURL = "";
    const response = await axiosInstance.get(`/getProfilePhoto/${id}/image`, {
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });
    const statusCode = response.status;
    if (statusCode === 200) {
      imageURL = URL.createObjectURL(response.data);
    }
    return imageURL;
  };

  return (
    <div className="w-full pt-16 h-auto">
      <p className="font-georgian text-5xl lg:text-7xl text-center mb-8">
        about me.
      </p>
      <p className="w-5/6 font-sans pb-16 text-center text-base word-spacing-wider tracking-widest mx-auto">
        download & print. bring street art into your home.
      </p>

      <div className="w-full h-auto relative pt-10 pb-6 bg-pink-400">
        {aboutMe !== null ? (
          <>
            <div className="pb-10 w-11/12 lg:w-4/5 xl:w-3/4 2xl:w-3/4 h-[560px] sm:h-[320px] md:h-[330px] lg:h-[350px] xl:h-[350px] mx-auto mt-10 bg-white rounded-lg drop-shadow-lg"></div>
            <div className=" h-auto w-full m-auto absolute top-5">
              <div className="size-24 sm:size-20 lg:size-28 xl:size-32 2xl:size-36 m-auto rounded-full">
                <img src={aboutMe.imageURL} alt="" className="rounded-full" />
              </div>
              <p className="w-full h-10 font-sans font-semibold uppercase text-lg word-spacing-wider flex items-center justify-center">
                {aboutMe.name}
              </p>
              <div className="w-full m-auto">
                <p className="w-3/4 mt-2 sm:mt-4 lg:mt-6 lg:w-3/5 mx-auto">
                  {aboutMe.description}
                </p>
                <p className="w-3/4 mt-6 sm:mt-4 lg:mt-6 lg:w-3/5 mx-auto text-right text-sm text-gray-500">
                  -- {aboutMe.name}
                </p>
                <div className="w-full mt-4 lg:mt-0 flex justify-center">
                  <SocialMedia />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* perspectives */}
        {topics !== null ? (
          topics.map((topic, index) => {
            let reverseStyle =
              index % 2 === 0 ? "lg:flex-row-reverse lg:pl-16" : "lg:flex-row";
            return (
              <div
                key={index}
                className={`py-5 sm:py-5 lg:py-10 w-11/12 sm:w-11/12 lg:w-[98%] h-auto lg:h-[630px] mx-auto mt-2 bg-white rounded-lg drop-shadow-lg flex flex-col sm:flex-col ${reverseStyle} justify-center justify-items-center`}
              >
                <div className="basis-1/2">
                  <div className="flex justify-center px-4 lg:px-8">
                    <Image
                      radius="sm"
                      isBlurred
                      alt={topic.title}
                      src={topic.imageURL}
                      fallbackSrc="https://via.placeholder.com/300x200"
                      className="w-auto h-[300px] sm:h-[350px] lg:h-[550px]"
                    />
                  </div>
                </div>
                <div className="basis-1/2 px-6 lg:px-0 lg:pr-20 w-full flex flex-col justify-center">
                  <p className="pt-8">{topic.title}</p>
                  <p className="pt-2 lg:pt-6">{topic.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AboutMe;
