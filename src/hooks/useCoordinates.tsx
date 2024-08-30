import { useEffect, useState } from 'react'

type Coordinate = [number, number, number, number] // [sura, aya, x, y]
type Page = Coordinate[]
type Coordinates = Page[]
export function useCoordinates() {
  const [coordinates, setCoordinates] = useState<Coordinates>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCoordinates = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/quran-metadata/mushaf-elmadina-warsh-azrak/aya.json`
        const response = await fetch(url, {
          cache: 'force-cache',
        })
        if (!response.ok) {
          throw new Error('Failed to load coordinates')
        }
        const data: { coordinates: Coordinates } = (await response.json()) as {
          coordinates: Coordinates
        }
        setCoordinates(data.coordinates)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Keep using default coordinates in case of error
      } finally {
        setLoading(false)
      }
    }

    loadCoordinates()
  }, [])

  return { coordinates, loading, error }
}
