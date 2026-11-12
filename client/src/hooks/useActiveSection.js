import { useEffect, useState } from 'react';

// Vraća id sekcije koja je trenutno ispod fiksne navigacije i
// upisuje ga u adresnu traku (history.replaceState, bez novih unosa u povijest).
// Aktivna je zadnja sekcija čiji je vrh prešao donji rub navigacije;
// na dnu stranice aktivna je zadnja sekcija (i kad je prekratka da dođe do vrha).
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const nav = document.querySelector('.navbar');
      const line = (nav ? nav.offsetHeight : 0) + 2;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current = ids[0];
      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }

      setActive(current);

      // Na vrhu stranice bez hasha URL ostaje čist
      const hash = `#${current}`;
      if (window.location.hash !== hash && (window.location.hash || current !== ids[0])) {
        history.replaceState(null, '', hash);
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    // Dolazak s #sekcija u URL-u: sadržaj se renderira nakon učitavanja
    // pa preglednik ne skoči sam; skoči odmah, bez klizanja
    const initial = decodeURIComponent(window.location.hash.slice(1));
    if (ids.includes(initial)) {
      document.getElementById(initial)?.scrollIntoView({ behavior: 'instant' });
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
