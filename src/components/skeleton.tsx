import gears from '@/asset/gear.svg'
import Image from 'next/image'
export default function Skeleton() {
  return (
    <div
      role="status"
      className="w-full h-screen flex justify-center items-center"
    >
      <Image src={gears} height={150} width={150} alt="loading" />
    </div>
  )
}
