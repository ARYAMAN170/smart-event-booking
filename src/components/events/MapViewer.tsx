import React from 'react';

interface MapViewerProps {
  location: string;
}

export const MapViewer: React.FC<MapViewerProps> = ({ location }) => {
  if (!location) return null;

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
      <iframe
        title="Event Location"
        width="100%"
        height="300"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={mapUrl}
        className="w-full block"
      />
    </div>
  );
};
