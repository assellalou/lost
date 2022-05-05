import { useContext, useRef, useEffect } from 'react';
import { Flex, Tag } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import { CordContext } from '../Context/CordContext';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef();
  const map = useRef();
  const [cordinates, setCordinates] = useContext(CordContext);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [cordinates.longitude, cordinates.latitude],
        zoom: cordinates.zoom,
      });
      map.current.resize();
    } else {
      map.current.on('move', () => {
        setCordinates({
          longitude: map.current.getCenter().lng.toFixed(4),
          latitude: map.current.getCenter().lat.toFixed(4),
          zoom: map.current.getZoom().toFixed(2),
        });
      });
    }
  });

  return (
    <Flex
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        borderRadius: '4px',
      }}
    >
      <Tag
        variant="outline"
        colorScheme="blue"
        size="sm"
        style={{ position: 'absolute', top: 5, left: 5, zIndex: 1 }}
      >
        Longitude: {cordinates.longitude}
      </Tag>
      <Tag
        variant="outline"
        colorScheme="blue"
        size="sm"
        style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
      >
        Latitude: {cordinates.latitude}
      </Tag>
      <div
        ref={mapContainer}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '4px',
        }}
      />
    </Flex>
  );
};

export default Map;
