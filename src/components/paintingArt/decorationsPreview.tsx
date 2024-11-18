import { Image } from "@nextui-org/react";
import { useState } from "react";
import { Decoration } from "../../type/customTypes";

interface IProps {
  decorations: Decoration[];
}
function DecorationsPreview(props: IProps) {
  const { decorations } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  // console.log(decorations);
  return decorations.length !== 0 ? (
    <div className="flex flex-col gap-1">
      <div
        className={`w-full h-24 flex flex-row gap-2 ${
          decorations.length <= 3 ? "justify-center" : "justify-start lg:justify-center"
        } ${
          decorations.length >= 5 ? "lg:justify-center" : ""
        } items-center overflow-auto scrollbar-hidden`}
      >
        {decorations.map((item, index) => (
          <div
            key={index}
            className={`size-20 min-w-20 flex justify-center items-center p-1 rounded-md border-1.5 ${
              activeIndex === index ? "border-pink-400" : "border-gray-200"
            } `}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={item.original} radius="none" className="max-h-[70px]" />
          </div>
        ))}
      </div>
      <div className="h-96 p-4 flex justify-center items-center border-2 rounded-md border-gray-100 bg-gray-50">
        <Image
          src={decorations[activeIndex].original}
          radius="md"
          className="max-h-[22rem]"
        />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DecorationsPreview;
