import Image from 'next/image'

import gears from '@/asset/spinner.svg'

export default function Spinner() {
  return (
    <div
      role="status"
      className="w-full h-screen flex justify-center items-center"
    >
      <Image src={gears} height={150} width={150} alt="loading" />
    </div>
  )
}
