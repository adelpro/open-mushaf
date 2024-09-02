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
      <Image src={spinner} height={100} width={100} alt="loading" />
    </div>
  )
}
