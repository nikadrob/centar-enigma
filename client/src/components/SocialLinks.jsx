import { getImage } from '../data/resources.js';

const SOCIAL = [
  { label: 'Instagram', image: 'instagram', href: 'https://www.instagram.com/centar_enigma/' },
  {
    label: 'Facebook',
    image: 'facebook',
    href: 'https://www.facebook.com/p/Dru%C5%A1tvo-sportske-rekreacije-Centar-Enigma-100084972020024/?locale=hr_HR',
  },
];

// Ikone društvenih mreža (u boji, sive pri prelasku mišem); otvaraju novi prozor
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`social ${className}`.trim()} aria-label="Društvene mreže">
      {SOCIAL.map((s) => {
        const src = getImage(s.image);
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (otvara se u novom prozoru)`}
            >
              {src ? <img src={src} alt="" width="28" height="28" /> : s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
