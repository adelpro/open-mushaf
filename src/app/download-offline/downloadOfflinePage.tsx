'use client'
import Link from 'next/link'

import { isPWASupported } from '@/utils/isPWASupported'

import DownloadOffline from './downloadOffline'

export default function DownloadOfflinePage() {
  return isPWASupported() ? (
    <div className="container p-2">
      <DownloadOffline />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen p-4 mt-4 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <h2 className="mt-4 text-2xl font-bold">
          دعم <bdi>PWA</bdi> غير متوفر
        </h2>

        <p className="mt-4 text-gray-600">
          لاستخدام تطبيقنا دون اتصال بالإنترنت، يجب أن يدعم متصفحك تقنية{' '}
          <bdi>PWA</bdi> التي تتيح التشغيل دون اتصال وتجربة مستخدم سلسة.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="w-full max-w-md transition duration-300 ease-in-out mx-4 my-2 px-4 py-2 font-medium rounded bg-blue-600 hover:opacity-90 text-white"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
