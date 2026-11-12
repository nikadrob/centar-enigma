import { useEffect } from 'react';

// Naslovi sekcija, kartice i elementi s klasom .reveal dobivaju klasu
// .is-visible kad uđu u viewport (jednom). CSS tada pokreće bounce animaciju.
// Elementi koji uđu zajedno animiraju se redom, s malim kašnjenjem.
// Skrivanje prije animacije vrijedi samo kad <html> ima .reveal-ready,
// pa je bez JS-a ili IntersectionObservera sadržaj normalno vidljiv.
const SELECTOR = '.section__title, .card, .reveal';
const STAGGER_MS = 80;
const MAX_STEPS = 5;

export default function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = [...document.querySelectorAll(SELECTOR)].filter(
      (el) => !el.classList.contains('is-visible')
    );

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
          )
          .forEach((entry, step) => {
            const delay = Math.min(step, MAX_STEPS) * STAGGER_MS;
            entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
      },
      // Element se otkriva kad mu vrh prijeđe donjih 10 % ekrana
      { rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    root.classList.add('reveal-ready');

    return () => observer.disconnect();
  }, []);
}
