import Link from 'next/link'

export async function generateMetadata() {
  const title = 'Open-Mushaf - About'
  const description = 'حول الموقع'
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

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-800 m-2 md:m-8">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-gray-50 p-2  text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12">
          حول الموقع
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          مصحف المدينة المنورة برواية ورش عن طريق الأزرق، الموقع مفتوح المصدر
          على{' '}
          <Link
            href="https://github.com/adelpro/open-mushaf"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            GitHub
          </Link>
        </p>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-3xl mx-auto p-2">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            المصادر
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg md:text-xl text-gray-700">
            <li>
              صفحات المصحف من{' '}
              <Link
                href="https://qurancomplex.gov.sa/techquran/dev/"
                className="text-blue-600 hover:underline"
              >
                مجمع الملك فهد لطباعة المصحف الشريف
              </Link>
            </li>
            <li>
              قاعدة البيانات (JSON) من{' '}
              <Link
                href="https://github.com/Zizwar/mushaf-mauri"
                className="text-blue-600 hover:underline"
              >
                Mushaf-mauri
              </Link>
            </li>
            <li>
              بيانات التفاسير من{' '}
              <Link
                href="https://quran.ksu.edu.sa/ayat"
                className="text-blue-600 hover:underline"
              >
                آيات
              </Link>
            </li>
            <li>
              الأيقونة من{' '}
              <Link
                href="https://www.svgrepo.com/"
                className="text-blue-600 hover:underline"
              >
                SVGRepo
              </Link>
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4">
            الميزات
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg md:text-xl text-gray-700">
            <li>الوصول إلى صفحات المصحف دون اتصال بالإنترنت.</li>
            <li>تصميم متجاوب لأجهزة سطح المكتب والمحمول.</li>
            <li>خيارات متعددة للتفسير.</li>
            <li>تنقل سلس بين السور والأجزاء.</li>
            <li>صور عالية الجودة من مجمع الملك فهد لطباعة المصحف الشريف.</li>
          </ul>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full py-6 mt-12 text-center">
        <hr className="border-t border-gray-300 mb-4" />
        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          من برمجة وتصميم{' '}
          <Link
            href="https://github.com/adelpro"
            className="text-blue-600 hover:underline"
          >
            adelpro
          </Link>
        </p>
      </footer>
    </div>
  )
}
