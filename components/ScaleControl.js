import { ScaleControl as BaseScaleControl } from 'react-mapbox-gl'

const ScaleControl = () => (
  <BaseScaleControl
    style={{
      backgroundColor: 'transparent',
      color: 'white',
      fontFamily: 'Inter',
      fontSize: 14,
      boxShadow: 'none',
      border: 'none',
      paddingBottom: 20,
    }}
  />
)

export default ScaleControl
