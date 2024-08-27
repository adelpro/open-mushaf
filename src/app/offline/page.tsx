import Offline from './Offline'

export async function generateMetadata() {
  const title = 'المتصفح غير متصل'
  const description = 'المتصفح غير متصل'

  return {
    title,
    description,
  }
}
export default function Page() {
  return <Offline />
}
