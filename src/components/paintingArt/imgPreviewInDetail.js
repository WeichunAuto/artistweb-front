import { Image } from "@nextui-org/react";
import React, {useState} from "react";

function ImgPreviewInDetail(props) {
  const { items } = props;
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="flex flex-col gap-1">
      <div className={`w-full h-24 flex flex-row gap-2 ${items.length <= 3 ? 'justify-center' : 'justify-start'} ${items.length >= 5 ? 'lg:justify-center' : ''} items-center overflow-auto`}>
        {items.map((item, index) => (
          <div className={`size-20 min-w-20 flex justify-center items-center p-1 rounded-md border-1.5 ${activeIndex === index ? 'border-pink-400' : 'border-gray-200'} `}
            onClick={()=>setActiveIndex(index)}
          >
            <Image src={item.original} radius="none" className="max-h-[70px]"/>
          </div>
        ))}
      </div>
      <div className="h-96 p-4 flex justify-center items-center border-2 rounded-md border-gray-100 bg-gray-50">
        <Image src={items[activeIndex].original} radius="md" className="max-h-[22rem]"/>
      </div>
    </div>
  );
}

export default ImgPreviewInDetail;
