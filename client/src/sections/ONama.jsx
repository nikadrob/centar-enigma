import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import { about } from '../data/about.js';
import { trainers } from '../data/trainers.js';

export default function ONama() {
  const blocks = [...about].sort((a, b) => a.sort_order - b.sort_order);
  const team = [...trainers].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <Section id="o-nama" title="O nama">
      <div className="grid">
        {blocks.map((item) => (
          <Card key={item.id} image={item.image} title={item.heading}>
            <p>{item.body}</p>
          </Card>
        ))}
      </div>

      <h3 className="subsection-title">Treneri</h3>
      <div className="grid">
        {team.map((item) => (
          <Card key={item.id} image={item.image} title={item.name} meta={item.role}>
            <p>{item.bio}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
