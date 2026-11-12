// Zajednički omotač sekcije: id za navigaciju (#hash), naslov i sadržaj.
// Klasa `section` kasnije nosi scroll-margin-top i animaciju ulaska.
export default function Section({ id, title, className = '', children }) {
  const titleId = title ? `${id}-naslov` : undefined;

  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={titleId}>
      <div className="container">
        {title && (
          <h2 id={titleId} className="section__title">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
