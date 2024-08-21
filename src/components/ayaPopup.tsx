import suraJSON from "@/data/quran-metadata/mushaf-elmadina-warsh-azrak/sura.json";
import tafseerKatheer from "@/data/tafaseer/katheer.json";
import tafseerMa3any from "@/data/tafaseer/ma3any.json";
import tafseerBaghawy from "@/data/tafaseer/baghawy.json";
import tafseerMuyassar from "@/data/tafaseer/muyassar.json";
import tafseerQortoby from "@/data/tafaseer/qortoby.json";
import tafseerTabary from "@/data/tafaseer/tabary.json";
import tafseerSaady from "@/data/tafaseer/saady.json";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useRef, useState } from "react";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  aya: number;
  sura: number;
};

type TafseerAya = {
  id: number;
  sura: number;
  aya: number;
  text: string;
};

type Tabs =
  | "katheer"
  | "ma3any"
  | "baghawy"
  | "muyassar"
  | "qortoby"
  | "tabary"
  | "saady";

export default function AyaPopup({ show, setShow, aya, sura }: Props) {
  const [popupHeight, setPopupHeight] = useLocalStorage<number>(
    "popupHeight",
    320
  );
  const [isResizing, setIsResizing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useLocalStorage<Tabs>(
    "selectedTafseer",
    "katheer"
  );

  const suraName = suraJSON[sura - 1].name;

  const tafseerKatheerArray: TafseerAya[] = tafseerKatheer as TafseerAya[];
  const tafseerMa3anyArray: TafseerAya[] = tafseerMa3any as TafseerAya[];
  const tafseerBaghawyArray: TafseerAya[] = tafseerBaghawy as TafseerAya[];
  const tafseerMuyassarArray: TafseerAya[] = tafseerMuyassar as TafseerAya[];
  const tafseerQurtubiArray: TafseerAya[] = tafseerQortoby as TafseerAya[];
  const tafseerTabariArray: TafseerAya[] = tafseerTabary as TafseerAya[];
  const tafseerSaadiArray: TafseerAya[] = tafseerSaady as TafseerAya[];

  const tafseers: Record<Tabs, TafseerAya | undefined> = {
    katheer: tafseerKatheerArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
    ma3any: tafseerMa3anyArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
    baghawy: tafseerBaghawyArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
    muyassar: tafseerMuyassarArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
    qortoby: tafseerQurtubiArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
    tabary: tafseerTabariArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
    saady: tafseerSaadiArray.find(
      (tafseer: TafseerAya) => tafseer.aya === aya && tafseer.sura === sura
    ),
  };

  const renderTafseerContent = (tafseerText: string | undefined) => (
    <div
      dangerouslySetInnerHTML={{
        __html: tafseerText || "لا يوجد تفسير.",
      }}
    />
  );
  const startResize = () => {
    setIsResizing(true);
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (isResizing && popupRef.current) {
        const newHeight = window.innerHeight - e.clientY;
        setPopupHeight(newHeight);
      }
    };
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, setPopupHeight]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-end transition-opacity duration-500 ease-in-out ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={() => setShow(false)}
      />

      {/* Popup */}
      <div
        ref={popupRef}
        className={`relative bg-white shadow-lg transform transition-transform duration-500 ease-in-out rounded-t-lg w-full max-w-md overflow-hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: popupHeight }}
      >
        {/* Resize Button */}
        <button
          className=" w-full flex flex-col justify-center items-center cursor-s-resize"
          onMouseDown={startResize}
          aria-label="Resize"
        >
          <span className="max-w-md w-20 h-[1px] rounded-md mt-1 mb-[1px] bg-gray-500"></span>
          <span className="max-w-md w-20 h-[1px] rounded-md mb-1 bg-gray-500"></span>
        </button>

        {/* overflow-y-auto */}
        <div className="h-full p-4 overflow-y-auto">
          {/* Close Button */}
          <button
            className="text-gray-500 hover:text-gray-700 mb-2 float-left text-xl"
            onClick={() => setShow(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <p className="text-lg leading-relaxed">
            {suraName} (<span className="font-bold">الأية</span> {aya})
          </p>
          {/* Tab Buttons */}
          <div className="flex justify-around mb-2" role="tablist">
            <button
              className={`py-2 px-4 ${
                selectedTab === "katheer" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "katheer"}
              role="tab"
              onClick={() => setSelectedTab("katheer")}
            >
              بن كثير
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "ma3any" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "ma3any"}
              role="tab"
              onClick={() => setSelectedTab("ma3any")}
            >
              معاني القرآن
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "baghawy" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "baghawy"}
              role="tab"
              onClick={() => setSelectedTab("baghawy")}
            >
              البغوي
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "muyassar" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "muyassar"}
              role="tab"
              onClick={() => setSelectedTab("muyassar")}
            >
              الميسر
            </button>
          </div>
          <div className="flex justify-around mb-4" role="tablist">
            <button
              className={`py-2 px-4 ${
                selectedTab === "qortoby" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "qortoby"}
              role="tab"
              onClick={() => setSelectedTab("qortoby")}
            >
              القرطبي
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "tabary" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "tabary"}
              role="tab"
              onClick={() => setSelectedTab("tabary")}
            >
              الطبري
            </button>
            <button
              className={`py-2 px-4 ${
                selectedTab === "saady" ? "border-b-2 border-blue-500" : ""
              }`}
              aria-selected={selectedTab === "saady"}
              role="tab"
              onClick={() => setSelectedTab("saady")}
            >
              السعدي
            </button>
          </div>
          {/* Tab Content */}
          {renderTafseerContent(tafseers[selectedTab]?.text)}
        </div>
      </div>
    </div>
  );
}
