import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import { trainings, scheduleImage } from '../data/trainings.js';
import { getImage } from '../data/resources.js';

export default function Treninzi() {
  const sorted = [...trainings].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <Section id="treninzi" title="Treninzi">
      <div className="grid">
        {sorted.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            title={item.name}
            meta={`${item.duration_min} min · ${item.level}`}
          >
            <p>{item.description}</p>
          </Card>
        ))}
      </div>

      <div className="schedule reveal">
        <h3>Raspored</h3>
        <ImagePlaceholder src={getImage(scheduleImage)} alt="Raspored treninga" ratio="336 / 462" />
      </div>
    </Section>
  );
}
