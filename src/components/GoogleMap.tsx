import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 32.7157, lng: -117.1611 }, // San Diego coordinates
        zoom: 10,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
          }
        ]
      });

      // Service area polygon
      const serviceArea = new window.google.maps.Polygon({
        paths: [
          { lat: 33.2, lng: -117.6 },
          { lat: 33.2, lng: -116.8 },
          { lat: 32.5, lng: -116.8 },
          { lat: 32.5, lng: -117.6 }
        ],
        strokeColor: '#1e40af',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.15
      });

      serviceArea.setMap(map);

      // Add marker for business location
      new window.google.maps.Marker({
        position: { lat: 32.7157, lng: -117.1611 },
        map: map,
        title: 'Christensen Plumbing Co. Service Area',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#1e40af"/>
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40)
        }
      });
    }
  }, []);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-96 rounded-lg shadow-lg ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMap;