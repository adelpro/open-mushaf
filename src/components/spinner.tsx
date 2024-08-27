import gears from '@/asset/spinner.svg'
import Image from 'next/image'
export default function Spinner() {
  return (
    <div
      role="status"
      className="w-screen max-w-md h-screen max-h-md p-4 m-auto flex justify-center items-center"
    >
      <Image src={gears} height={150} width={150} alt="loading" />
    </div>
  )
}
