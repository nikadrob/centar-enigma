import ImagePlaceholder from './ImagePlaceholder.jsx';
import { getImage } from '../data/resources.js';

// Kartica s opcionalnom slikom (ključ iz resources.js), naslovom i sadržajem.
export default function Card({ image, imageRatio = '3 / 4', title, meta, className = '', children }) {
  return (
    <article className={`card ${className}`.trim()}>
      {image !== undefined && (
        <ImagePlaceholder src={getImage(image)} alt={title} ratio={imageRatio} />
      )}
      <div className="card__body">
        {meta && <p className="card__meta">{meta}</p>}
        {title && <h3 className="card__title">{title}</h3>}
        {children}
      </div>
    </article>
  );
}
