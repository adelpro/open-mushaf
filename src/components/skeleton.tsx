import Image from 'next/image'

import spinner from '@/asset/spinner.svg'
export default function Skeleton() {
  return (
    <div
      role="status"
      aria-label="loading"
      aria-live="polite"
      aria-busy="true"
      className="w-full h-screen flex justify-center items-center"
    >
      <Image src={spinner} height={150} width={150} alt="loading" />
    </div>
  )
}
