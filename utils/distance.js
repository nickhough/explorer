import turfDistance from '@turf/distance'
import { point as turfPoint } from '@turf/helpers'

export const calculateDistance = (pointA, pointB) =>
  turfDistance(turfPoint(pointA), turfPoint(pointB), { units: 'meters' })

export const formatDistance = (meters) => {
  if (meters < 1000) {
    return meters.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' m'
  }

  if (meters < 10000) {
    return (
      (meters / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 }) +
      ' km'
    )
  }

  return (
    (meters / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 }) +
    ' km'
  )
}
