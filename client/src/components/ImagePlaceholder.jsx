import { useState } from 'react';

// Prikazuje sliku ako postoji `src`; inače (ili ako se slika ne učita) sivu
// kutiju istog omjera s natpisom. Omjer je zadan kao CSS aspect-ratio, npr. '3 / 4'.
export default function ImagePlaceholder({ src, alt = '', ratio = '4 / 3', label }) {
  const [failed, setFailed] = useState(false);
  const style = { aspectRatio: ratio };

  if (!src || failed) {
    return (
      <div className="image-placeholder" style={style} role="img" aria-label={alt || 'Slika'}>
        <span>{label || alt || 'Slika'}</span>
      </div>
    );
  }

  return (
    <img
      className="image"
      src={src}
      alt={alt}
      style={style}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
