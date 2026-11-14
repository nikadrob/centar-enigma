import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { home } from '../data/home.js';
import { getImage } from '../data/resources.js';

// "Centar Enigma": prva riječ u prvom redu, ostatak u drugom u boji gumba
const [titleFirst, ...titleWords] = home.title.split(' ');
const titleRest = titleWords.join(' ');

export default function Pocetna() {
  return (
    <Section id="pocetna" className="section--hero">
      <SocialLinks className="hero__social" />
      <div className="hero">
        <div className="hero__text">
          <h1 className="section__title">
            {titleFirst}
            <br />
            <span className="hero__title-accent">{titleRest}</span>
          </h1>
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
