import Image from "next/image";
import React, { useEffect } from "react";
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
  const pageImageRef = React.useRef<HTMLImageElement>(null);
  const [mushafPage, setMushafPage] = React.useState<{
    width: number;
    height: number;
  }>({ width: pageWidth, height: pageHeight });
  const [_, setSelectedPage] = useLocalStorage<Number>("selectedPage", 1);
  const { overlay, selectedAya, show, setShow } = usePageOverlay(Number(index));

  useEffect(() => {
    console.log(
      "pageImageRef",
      pageImageRef.current?.width,
      pageImageRef.current?.height
    );
    setMushafPage({
      width: pageImageRef.current?.width || pageWidth,
      height: pageImageRef.current?.height || pageHeight,
    });
  }, []);
  return (
    <div className="relative flex justify-center items-center w-full max-w-[500px] min-h-96 p-0 m-0">
      {...overlay}
      <Image
        ref={pageImageRef}
        src={`/mushaf/mushaf-elmadina-warsh-azrak/${index}.png`}
        alt="image"
        width={pageWidth}
        height={pageHeight}
        className="w-full h-full m-0 p-0 border border-red-700"
        onLoad={() => {
          setSelectedPage(Number(index));
        }}
        priority
        quality={100}
        blurDataURL={placeHolder}
        placeholder="blur"
      />
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
