import Image from 'next/image'
import Link from 'next/link'

import emailSVG from '@/asset/email.svg'

export async function generateMetadata() {
  const title = 'Open-Mushaf - Contact'
  const description = 'إتصل بنا'
  const openGraph = {
    title,
    description,
  }

  return {
    title,
    description,
    openGraph,
  }
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-gray-50 p-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12">
          تواصل معنا
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          نحن هنا لمساعدتك. يمكنك التواصل معنا عبر الوسائل التالية.
        </p>
      </section>

      {/* Contact Information Section */}
      <main className="w-full max-w-3xl mx-auto p-8 text-center">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <Image
            src={emailSVG}
            width={64}
            height={64}
            alt="Email Icon"
            className="mx-auto mb-6"
          />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            إذا كان لديك أي استفسارات أو تعليقات، لا تتردد في الاتصال بنا عبر{' '}
            <Link
              href="https://x.com/adelpro"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Twitter
            </Link>
          </p>
          <p className="text-base md:text-lg text-gray-600">
            نحن نرحب بكل استفسار وسنكون سعداء بالرد عليك في أقرب وقت ممكن.
          </p>
        </div>
      </main>
    </div>
  )
}
