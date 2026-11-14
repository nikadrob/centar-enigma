import { useState } from 'react';

// Google karta se učitava tek na klik: prije toga Google ne dobiva IP ni ne postavlja kolačiće
export default function MapEmbed({ src, title }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map">
      {loaded ? (
        <iframe src={src} title={title} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="map__placeholder">
          <p>Karta se učitava s Google Maps. Klikom pristajete da Google pritom može postaviti kolačiće.</p>
          <button type="button" className="button" onClick={() => setLoaded(true)}>
            Prikaži kartu
          </button>
        </div>
      )}
    </div>
  );
}
