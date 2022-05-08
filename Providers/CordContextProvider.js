import { useState, useEffect } from 'react';
import { CordContext } from '/Context/CordContext';

export default function CordProvider({ children }) {
  const [cord, setCord] = useState({
    longitude: -5.8905,
    latitude: 33.6733,
    zoom: 4,
  });

  useEffect(() => {
    setCord(cord);
  }, [cord]);

  return (
    <CordContext.Provider value={[cord, setCord]}>
      {children}
    </CordContext.Provider>
  );
}
