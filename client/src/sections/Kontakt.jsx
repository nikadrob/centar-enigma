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
            <div className="contact__actions">
              <button type="submit" className="button">
                Pošalji
              </button>
              <a href="#pocetna" className="to-top" aria-label="Povratak na vrh">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                  <path
                    d="M12 19V5M5 12l7-7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <p className="form-status" role="status">
              {sent && 'Hvala! Poruka je zaprimljena (slanje još nije povezano sa serverom).'}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
