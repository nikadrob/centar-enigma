import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { home } from '../data/home.js';
import { getImage } from '../data/resources.js';

export default function Pocetna() {
  return (
    <Section id="pocetna" className="section--hero">
      <div className="hero">
        <div className="hero__text">
          <h1 className="section__title">{home.title}</h1>
          <p className="hero__subtitle">{home.subtitle}</p>
          <a className="button" href={`#${home.cta_target}`}>
            {home.cta_label}
          </a>
        </div>
        <ImagePlaceholder src={getImage(home.image)} alt={home.title} ratio="16 / 9" />
      </div>

      <div className="grid">
        {home.highlights.map((item) => (
          <Card key={item.id} image={item.image} imageRatio="16 / 10" title={item.title}>
            <p>{item.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
