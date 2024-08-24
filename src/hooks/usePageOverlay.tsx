import { coordinateElMadinaWarshAzrak } from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/aya";
import {
  defaultLineHeight,
  defaultMarginX,
  defaultMarginY,
  defaultPageHeight,
  defaultPageWidth,
  defaultFirstPagesWidth,
  defaultFirstPAgesMarginX,
  defaultFirstPagesMarginY,
} from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/spec";
import { Aya, Page } from "@/types";
import { getDimensionCoeff } from "@/utils/getDimensionCoeff";

import { useState } from "react";

type SelectedAya = {
  aya: number;
  sura: number;
};
type Props = {
  index: number;
  dimensions: { customPageWidth: number; customPageHeight: number };
};
const usePageOverlay = ({ index, dimensions }: Props) => {
  const [selectedAya, setSelectedAya] = useState<SelectedAya>({
    aya: 0,
    sura: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  const { customPageHeight, customPageWidth } = dimensions;

  const heightCoeff = getDimensionCoeff({
    defaultDimension: defaultPageHeight,
    customDimension: customPageHeight,
  });
  const widthCoeff = getDimensionCoeff({
    defaultDimension: defaultPageWidth,
    customDimension: customPageWidth,
  });

  // correct dimensions
  let marginX = defaultMarginX * heightCoeff;

  // correct dimensions for 1/2 pages
  if (index <= 2) {
    marginX = defaultFirstPAgesMarginX * heightCoeff;
  }

  const lineHeight = defaultLineHeight * heightCoeff;

  let pageWidth = defaultPageWidth * widthCoeff;

  // correct dimensions for 1/2 pages
  if (index <= 2) {
    pageWidth = defaultFirstPagesWidth * widthCoeff;
  }

  let marginY = defaultMarginY * widthCoeff;

  // correct dimensions for 1/2 pages
  if (index <= 2) {
    marginY = defaultFirstPagesMarginY * widthCoeff;
  }

  //

  let prevX = marginX;

  let overlay: JSX.Element[] = [];

  const page: Page = coordinateElMadinaWarshAzrak[Number(index)];
  const ayaClick = ({ aya, sura }: { aya: number; sura: number }) => {
    setSelectedAya({ aya, sura });
    setShow(true);
  };
  page.map((aya: Aya) => {
    const defaultX: number = aya[2];

    const defaultY: number = aya[3];

    // Dimensions correction
    let X = defaultX * heightCoeff;
    // Correction for first and secod pages only
    if (index <= 2) {
      X = X - 100;
      console.log("X", X);
    }
    const Y = defaultY * widthCoeff;

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
          border: "1px solid red",
          backgroundColor: `${
            show && selectedAya.aya === aya[1] && selectedAya.sura === aya[0]
              ? "rgba(128, 128, 128, 0.5)"
              : "transparent"
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
          className={`absolute cursor-pointer`}
          onClick={() => ayaClick({ aya: aya[1] + 1, sura: aya[0] })}
          style={{
            top: `${X}px`,
            left: `${marginY}px`,
            width: `${Y - marginY * 2}px`,
            height: `${lineHeight}px`,
            //border: "1px solid blue",
            backgroundColor: `${
              show &&
              selectedAya.aya === aya[1] + 1 &&
              selectedAya.sura === aya[0]
                ? "rgba(128, 128, 128, 0.5)"
                : "transparent"
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
            //border: "1px solid green",
            backgroundColor: `${
              show && selectedAya.aya === aya[1] && selectedAya.sura === aya[0]
                ? "rgba(128, 128, 128, 0.5)"
                : "transparent"
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
        // skip the line befor the first aya (Containing the sura name)
        if (x >= 40 && selectedAya.aya !== 1) {
          overlay = [...overlay, fullDiv(x)];
        }
      } while (i > 1);
    }

    prevX = X;
  });

  return { overlay, show, setShow, selectedAya };
};

export default usePageOverlay;
