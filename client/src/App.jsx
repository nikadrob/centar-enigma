import Navbar from './components/Navbar.jsx';
import useReveal from './hooks/useReveal.js';
import Pocetna from './sections/Pocetna.jsx';
import Novosti from './sections/Novosti.jsx';
import Treninzi from './sections/Treninzi.jsx';
import Cjenik from './sections/Cjenik.jsx';
import ONama from './sections/ONama.jsx';
import Kontakt from './sections/Kontakt.jsx';

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Pocetna />
        <Novosti />
        <Treninzi />
        <Cjenik />
        <ONama />
        <Kontakt />
      </main>
      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Centar Enigma</div>
      </footer>
    </>
  );
}
