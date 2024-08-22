import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { bookBase64 as placeHolder } from "@/asset/bookBase64";
import usePageOverlay from "@/hooks/usePageOverlay";
import AyaPopup from "./ayaPopup";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  defaultPageHeight,
  defaultPageWidth,
} from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";

type Props = {
  index: string;
};

export default function MushafPage({ index }: Props) {
  const pageImageRef = useRef<HTMLImageElement>(null);
  const [mushafPage, setMushafPage] = useState<{
    width: number;
    height: number;
  }>({ width: defaultPageWidth, height: defaultPageHeight });

  const [_, setSelectedPage] = useLocalStorage<Number>("selectedPage", 1);

  //TODO add custom width and height from mushafPage state

  const dimensions = {
    customPageWidth: mushafPage.width,
    customPageHeight: mushafPage.height,
  };
  const { overlay, selectedAya, show, setShow } = usePageOverlay({
    index: Number(index),
    dimensions,
  });

  useEffect(() => {
    setMushafPage({
      width: pageImageRef.current?.width || defaultPageWidth,
      height: pageImageRef.current?.height || defaultPageHeight,
    });
  }, []);
  return (
    <div className="relative flex flex-col justify-center items-center w-full max-w-[500px] min-h-96 inset-0">
      <div className="w-full items-center justify-center">
        <Image
          ref={pageImageRef}
          src={`/mushaf/mushaf-elmadina-warsh-azrak/${index}.png`}
          alt="image"
          width={defaultPageWidth}
          height={defaultPageHeight}
          className="w-full h-full object-cover"
          onLoad={() => {
            setSelectedPage(Number(index));
          }}
          priority
          quality={100}
          blurDataURL={placeHolder}
          placeholder="blur"
        />
      </div>
      <span className="text-gray-500 ">الصفحة {index}</span>
      <div className="items-center justify-center">{...overlay}</div>
      {show ? (
        <AyaPopup
          aya={selectedAya.aya}
          sura={selectedAya.sura}
          show={show}
          setShow={setShow}
        />
      ) : null}
    </div>
  );
}
