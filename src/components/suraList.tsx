import { Sura } from '@/types'

import SuraCard from './suraCard'

type Props = {
  data: Sura[]
}
export default function SuraList({ data }: Props) {
  const suradata = data

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center
        grid-flow-col-reverse
        `}
    >
      {suradata.map((sura: Sura) => (
        <SuraCard key={sura.number} sura={sura} />
      ))}
    </div>
  )
}
