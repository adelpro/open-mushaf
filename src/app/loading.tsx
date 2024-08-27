import Skeleton from '@/components/skeleton'

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Skeleton />
    </div>
  )
}
