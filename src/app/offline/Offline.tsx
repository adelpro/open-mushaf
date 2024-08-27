'use client'
import { useRouter } from 'next/navigation'

export default function Offline() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mt-4 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <h2 className="mt-4 text-2xl font-bold">المتصفح غير متصل</h2>

        <div className="mt-6 flex flex-col md:flex-row gap-2">
          <button
            onClick={() => router.push('/')}
            className="w-full max-w-md transition duration-300 ease-in-out mx-4 my-2 px-4 py-2 font-medium rounded bg-blue-500 hover:opacity-90 text-white"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}
