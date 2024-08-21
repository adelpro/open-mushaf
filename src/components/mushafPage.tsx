import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { bookBase64 as placeHolder } from "@/asset/bookBase64";
import usePageOverlay from "@/hooks/usePageOverlay";
import AyaPopup from "./ayaPopup";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  pageHeight,
  pageWidth,
} from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";

type Props = {
  index: string;
};

export default function MushafPage({ index }: Props) {
  const pageImageRef = useRef<HTMLImageElement>(null);
  const [mushafPage, setMushafPage] = useState<{
    width: number;
    height: number;
  }>({ width: pageWidth, height: pageHeight });
  const [_, setSelectedPage] = useLocalStorage<Number>("selectedPage", 1);
  const { overlay, selectedAya, show, setShow } = usePageOverlay(Number(index));

  useEffect(() => {
    setMushafPage({
      width: pageImageRef.current?.width || pageWidth,
      height: pageImageRef.current?.height || pageHeight,
    });
  }, []);
  return (
    <div className="relative flex justify-center items-center w-full max-w-[500px] min-h-96 p-0 m-0">
      {...overlay}
      <div className="w-full h-full m-0 p-0 flex flex-col items-center justify-center">
        <Image
          ref={pageImageRef}
          src={`/mushaf/mushaf-elmadina-warsh-azrak/${index}.png`}
          alt="image"
          width={pageWidth}
          height={pageHeight}
          className="w-full h-full m-0 p-0"
          onLoad={() => {
            setSelectedPage(Number(index));
          }}
          priority
          quality={100}
          blurDataURL={placeHolder}
          placeholder="blur"
        />
        <span className="text-gray-500 ">الصفحة {index}</span>
      </div>
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
