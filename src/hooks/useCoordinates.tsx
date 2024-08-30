import { useEffect, useState } from 'react'

import { Aya } from '@/types'

type Coordinate = [number, number, number, number] // [sura, aya, x, y]
type Page = Coordinate[]
type Coordinates = Page[]
export function useCoordinates(index: number) {
  const [coordinates, setCoordinates] = useState<Coordinates>([])
  const [page, setPage] = useState<Aya[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCoordinates = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/aya.json`
        const data = (await fetch(url, {
          cache: 'force-cache',
        }).then((response) => response.json())) as {
          coordinates: Coordinates
        }
        setCoordinates(data?.coordinates || [])

        setPage(data.coordinates[index] || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Keep using default coordinates in case of error
      } finally {
        setLoading(false)
      }
    }

    loadCoordinates()
  }, [index])

  return { coordinates, page, loading, error }
}
