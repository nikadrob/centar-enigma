import { useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import { sections } from '../data/sections.js';
import useActiveSection from '../hooks/useActiveSection.js';

const DESKTOP_QUERY = '(min-width: 768px)';
const SECTION_IDS = sections.map((s) => s.id);

// Fiksna navigacija. Obične #poveznice: preglednik sam klizi na sekciju
// (scroll-behavior: smooth) i upisuje #sekcija u adresnu traku.
// Ispod 768 px poveznice su u hamburger izborniku.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const active = useActiveSection(SECTION_IDS);

  // Dok je izbornik otvoren: Esc i klik izvan navigacije ga zatvaraju
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(e) {
      if (!headerRef.current?.contains(e.target)) setOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  // Prelaskom na desktop širinu izbornik se zatvara
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header ref={headerRef} className={`navbar${open ? ' is-open' : ''}`}>
      <nav className="navbar__inner container" aria-label="Glavna navigacija">
        <Logo />
        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="navbar-links"
          aria-label={open ? 'Zatvori izbornik' : 'Otvori izbornik'}
          onClick={() => setOpen(!open)}
        >
          <span className="navbar__toggle-bar" aria-hidden="true" />
          <span className="navbar__toggle-bar" aria-hidden="true" />
          <span className="navbar__toggle-bar" aria-hidden="true" />
        </button>
        <ul id="navbar-links" className="navbar__links">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={s.id === active ? 'is-active' : undefined}
                aria-current={s.id === active ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
