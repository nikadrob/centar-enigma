import Section from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import { pricing } from '../data/pricing.js';

const priceFormat = new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export default function Cjenik() {
  const sorted = [...pricing].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <Section id="cjenik" title="Cjenik">
      <div className="grid">
        {sorted.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            meta={item.highlighted ? 'Preporučeno' : null}
            className={item.highlighted ? 'card--highlighted' : ''}
          >
            <p className="price">
              {priceFormat.format(item.price_eur)} <span>/ {item.period}</span>
            </p>
            <ul className="features">
              {item.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
