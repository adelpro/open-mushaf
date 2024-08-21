import { coordinateElMadinaWarshAzrak } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/aya";
import {
  lineHeight,
  marginX,
  marginY,
  pageWidth,
} from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";
import { Aya, Page } from "@/types";
import { useState } from "react";

type SelectedAya = {
  aya: number;
  sura: number;
};
const usePageOverlay = (index: number) => {
  const [selectedAya, setSelectedAya] = useState<SelectedAya>({
    aya: 0,
    sura: 0,
  });
  const [show, setShow] = useState<boolean>(false);

  let prevX = marginX;
  let overlay: JSX.Element[] = [];

  const page: Page = coordinateElMadinaWarshAzrak[Number(index)];
  const ayaClick = ({ aya, sura }: { aya: number; sura: number }) => {
    setSelectedAya({ aya, sura });
    setShow(true);
  };
  page.map((aya: Aya) => {
    const X: number = aya[2];
    const Y: number = aya[3];

    // Drawing overlay for aya line (first part before the aya marker)
    const div = (
      <div
        className={`absolute cursor-pointer`}
        data-aya={aya[1]}
        data-sura={aya[0]}
        style={{
          top: `${X}px`,
          left: `${Y - marginY}px`,
          width: `${pageWidth + marginY - Y}px`,
          height: `${lineHeight}px`,
          backgroundColor: `${
            show && selectedAya.aya === aya[1] && selectedAya.sura === aya[0]
              ? "rgba(128, 128, 128, 0.5)"
              : ""
          }`,
        }}
        onClick={() => ayaClick({ aya: aya[1], sura: aya[0] })}
      ></div>
    );
    overlay = [...overlay, div];
    // Drawing overlay for aya line (last part after the aya marker in the same line)
    if (Y > 93) {
      const divNextAya = (
        <div
          data-aya={aya[1] + 1}
          data-sura={aya[0]}
          className={`absolutecursor-pointer`}
          onClick={() => ayaClick({ aya: aya[1] + 1, sura: aya[0] })}
          style={{
            top: `${X}px`,
            left: `${marginY}px`,
            width: `${Y - marginY * 2}px`,
            height: `${lineHeight}px`,
            backgroundColor: `${
              show &&
              selectedAya.aya === aya[1] + 1 &&
              selectedAya.sura === aya[0]
                ? "rgba(128, 128, 128, 0.5)"
                : ""
            }`,
          }}
        ></div>
      );
      overlay = [...overlay, divNextAya];
    }

    // Drawing overlay for multiple-line aya
    const numberOfLines: number = Math.ceil((X - prevX) / lineHeight);
    if (numberOfLines > 1) {
      const fullDiv = (x: number) => (
        <div
          data-aya={aya[1]}
          data-sura={aya[0]}
          onClick={() => ayaClick({ aya: aya[1], sura: aya[0] })}
          className={`absolute cursor-pointer`}
          style={{
            top: `${x}px`,
            left: `${marginY}px`,
            width: `${pageWidth - marginY}px`,
            height: `${lineHeight}px`,
            backgroundColor: `${
              show && selectedAya.aya === aya[1] && selectedAya.sura === aya[0]
                ? "rgba(128, 128, 128, 0.5)"
                : ""
            }`,
          }}
        ></div>
      );
      let i = numberOfLines;
      let x = X;

      do {
        i = i - 1;
        x = x - lineHeight;

        // skip the first line of the page ( margin )
        if (x >= 40) {
          overlay = [...overlay, fullDiv(x)];
        }
      } while (i > 1);
    }

    prevX = X;
  });

  return { overlay, show, setShow, selectedAya };
};

export default usePageOverlay;
