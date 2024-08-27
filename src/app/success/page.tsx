import Success from './Success'

export async function generateMetadata() {
  const title = 'تمت العملية بنجاح'
  const description = 'تمت العملية بنجاح'

  return {
    title,
    description,
  }
}
export default function Page() {
  return <Success />
}
