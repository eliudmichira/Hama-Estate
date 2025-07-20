import { useEffect, useRef } from 'react';
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const GooglePin = ({ data, highlightedProperty, onMarkerHover }) => {
  const map = useMap();
  const clustererRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!map || !window.google || !window.google.maps) return;

    // Remove previous markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }

    // Create native Google Maps markers for clustering
    const markers = data.map(location => {
      const isHighlighted = highlightedProperty === location.id;
      
      const marker = new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map,
        title: location.title,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width='${isHighlighted ? '50' : '40'}' height='${isHighlighted ? '50' : '40'}' viewBox='0 0 ${isHighlighted ? '50' : '40'} ${isHighlighted ? '50' : '40'}' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx='${isHighlighted ? '25' : '20'}' cy='${isHighlighted ? '25' : '20'}' r='${isHighlighted ? '22' : '18'}' 
                fill='${isHighlighted ? '#EF4444' : '#3B82F6'}' 
                stroke='#fff' 
                stroke-width='${isHighlighted ? '3' : '2'}'
                ${isHighlighted ? 'filter="url(#glow)"' : ''}
              />
              <text x='${isHighlighted ? '25' : '20'}' y='${isHighlighted ? '30' : '25'}' text-anchor='middle' fill='white' font-family='Arial' font-size='${isHighlighted ? '14' : '12'}' font-weight='bold'>$${Math.round(location.price/1000)}k</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(isHighlighted ? 50 : 40, isHighlighted ? 50 : 40),
          anchor: new window.google.maps.Point(isHighlighted ? 25 : 20, isHighlighted ? 25 : 20)
        },
        zIndex: isHighlighted ? 1000 : 1
      });

      // Add hover events to marker
      marker.addListener('mouseover', () => {
        if (onMarkerHover) {
          onMarkerHover(location.id);
        }
      });

      marker.addListener('mouseout', () => {
        if (onMarkerHover) {
          onMarkerHover(null);
        }
      });

      // Add click event to marker
      marker.addListener('click', () => {
        // You can add navigation or info window here
        });

      return marker;
    });
    markersRef.current = markers;

    // Create and add clusterer with basic options (no GridAlgorithm)
    clustererRef.current = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ count, position }) => {
          const svg = `
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="#fff" stroke-width="2"/>
              <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">${count}</text>
            </svg>
          `;
          
          return new window.google.maps.Marker({
            position,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20)
            },
            label: '',
            title: `${count} properties`,
            zIndex: Number.MAX_SAFE_INTEGER
          });
        }
      }
    });

    return () => {
      markers.forEach(marker => marker.setMap(null));
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
      }
    };
  }, [map, data, highlightedProperty, onMarkerHover]);

  // No need to render anything in React tree, markers are managed by Google Maps API
  return null;
};

export default GooglePin;
