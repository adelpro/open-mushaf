import gears from "@/asset/gear.svg";
import Image from "next/image";
export default function Skeleton() {
  return (
    <div
      role="status"
      className="w-screen max-w-md h-screen max-h-md p-4 m-auto flex justify-center items-center"
    >
      <Image src={gears} height={150} width={150} alt="loading" />
    </div>
  );
}
