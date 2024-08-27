import Link from 'next/link'

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
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-white text-gray-900">
      <h1 className="text-3xl font-semibold mb-8 text-center">تواصل معنا</h1>
      <p className="text-xl mb-8 text-center leading-relaxed">
        يمكنك التواصل مع المطور عبر حسابه على{' '}
        <Link
          href="https://x.com/adelpro"
          className="text-blue-500 hover:underline"
        >
          X (Twitter)
        </Link>
      </p>
    </div>
  )
}
