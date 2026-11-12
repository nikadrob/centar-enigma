import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import { news } from '../data/news.js';

const dateFormat = new Intl.DateTimeFormat('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Novosti() {
  const sorted = [...news].sort((a, b) => b.published_at.localeCompare(a.published_at));

  return (
    <Section id="novosti" title="Novosti">
      <div className="grid">
        {sorted.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            title={item.title}
            meta={<time dateTime={item.published_at}>{dateFormat.format(new Date(item.published_at))}</time>}
          >
            <p>{item.excerpt}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
