import express from 'express';
import newsRouter from './routes/news.js';
import trainingsRouter from './routes/trainings.js';
import pricingRouter from './routes/pricing.js';
import aboutRouter from './routes/about.js';
import trainersRouter from './routes/trainers.js';
import contactRouter from './routes/contact.js';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/news', newsRouter);
app.use('/api/trainings', trainingsRouter);
app.use('/api/pricing', pricingRouter);
app.use('/api/about', aboutRouter);
app.use('/api/trainers', trainersRouter);
app.use('/api/contact', contactRouter);

// Nepoznate /api rute vraćaju JSON umjesto HTML-a
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Ruta ne postoji' });
});

// Greške (npr. neispravan JSON u tijelu zahtjeva) također kao JSON
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status === 400 ? 'Neispravan JSON' : status === 413 ? 'Zahtjev je prevelik' : 'Greška na serveru',
  });
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
