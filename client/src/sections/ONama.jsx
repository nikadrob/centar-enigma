import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import { about } from '../data/about.js';
import { trainers } from '../data/trainers.js';
import { contact } from '../data/contact.js';

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

      {contact.map_url && (
        <>
          <h3 className="subsection-title">Gdje se nalazimo</h3>
          <MapEmbed src={contact.map_url} title="Lokacija Centra Enigma na Google kartama" />
        </>
      )}
    </Section>
  );
}
