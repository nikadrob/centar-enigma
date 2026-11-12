import { getImage } from '../data/resources.js';

// Slikovni logo ako postoji u resources.js, inače tekstualni
export default function Logo() {
  const src = getImage('logo');

  return (
    <a href="#pocetna" className="logo" aria-label="Centar Enigma, početna">
      {src ? <img src={src} alt="Centar Enigma" /> : <span className="logo__text">Centar Enigma</span>}
    </a>
  );
}
