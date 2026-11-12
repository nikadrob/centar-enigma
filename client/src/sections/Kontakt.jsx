import { useState } from 'react';
import Section from '../components/Section.jsx';
import { contact, contactFormFields } from '../data/contact.js';

const emptyForm = Object.fromEntries(contactFormFields.map((f) => [f.name, '']));

export default function Kontakt() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  }

  // Zasad bez slanja; kasnije POST /api/contact
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm(emptyForm);
  }

  return (
    <Section id="kontakt" title="Kontakt">
      <div className="contact">
        <div className="contact__info card">
          <div className="card__body">
            <address>
              <p>{contact.address}</p>
              <p>
                Telefon: <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              </p>
              <p>
                E-mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </address>
            <h3>Radno vrijeme</h3>
            <dl className="hours">
              {contact.working_hours.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <form className="contact__form card" onSubmit={handleSubmit}>
          <div className="card__body">
            {contactFormFields.map((field) => {
              const id = `kontakt-${field.name}`;
              const props = {
                id,
                name: field.name,
                value: form[field.name],
                onChange: handleChange,
                required: field.required,
              };
              return (
                <div className="field" key={field.name}>
                  <label htmlFor={id}>
                    {field.label}
                    {field.required && ' *'}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea rows="5" {...props} />
                  ) : (
                    <input type={field.type} {...props} />
                  )}
                </div>
              );
            })}
            <button type="submit" className="button">
              Pošalji
            </button>
            <p className="form-status" role="status">
              {sent && 'Hvala! Poruka je zaprimljena (slanje još nije povezano sa serverom).'}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
