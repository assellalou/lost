import { useContext, useRef, useEffect } from 'react';
import { Flex, Tag } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { CordContext } from '@context/CordContext';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

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
      }).addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          placeholder: 'Search for a place',
          proximity: [cordinates.longitude, cordinates.latitude],
          limit: 3,
        }),
      );
      map.current.resize();
    }
    map.current.on('move', () => {
      setCordinates({
        longitude: map.current.getCenter().lng.toFixed(4),
        latitude: map.current.getCenter().lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2),
      });
    });
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
      {/* Display Lat and Lng For Debuging purposes */}
      <Tag
        variant="outline"
        colorScheme="red"
        size="sm"
        style={{ position: 'absolute', bottom: 10, right: 40, zIndex: 1 }}
      >
        Latitude: {cordinates.latitude} Longitude: {cordinates.longitude}
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
