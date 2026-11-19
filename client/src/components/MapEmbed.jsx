// Google karta se prikazuje odmah; preglednik je učitava tek kad se sekcija
// približi ekranu (loading="lazy"). Napomena: Google pritom dobiva IP i može
// postaviti kolačiće, pa stranica treba obavijest / privolu za kolačiće.
export default function MapEmbed({ src, title }) {
  return (
    <div className="map">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
