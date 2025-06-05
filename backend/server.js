const express = require('express');
const cors = require('cors');
const path = require('path'); // Aggiunto per servire file statici (interfaccia admin)

const app = express();
const PORT = process.env.PORT || 3000; // Porta per il backend

// Middleware
app.use(cors()); // Abilita CORS per tutte le route
app.use(express.json()); // Per parsare JSON request bodies
app.use(express.urlencoded({ extended: true })); // Per parsare URL-encoded request bodies

// --- Configurazione della connessione a PostgreSQL ---
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'corbiolo_calcetto',
  password: process.env.DB_PASSWORD || 'password', // Cambiare in produzione!
  port: process.env.DB_PORT || 5432,
  // SSL opzionale, utile per connessioni remote sicure
  // ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('Tentativo di connessione a PostgreSQL effettuato (configurazione caricata).');
  console.log(`Usando DBNAME: ${process.env.DB_NAME || 'corbiolo_calcetto'}`);
});

pool.on('error', (err) => {
  console.error('Errore di connessione/query a PostgreSQL (il server DB potrebbe non essere in esecuzione o configurato):', err.message);
});

// Test di connessione al database all'avvio
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Errore test query iniziale SELECT NOW():', err.message);
  } else {
    console.log('Test query SELECT NOW() eseguita con successo. Risposta DB:', res.rows[0]);
  }
});

// Funzione helper per eseguire query (da usare nelle route)
// const query = async (text, params) => {
//   try {
//     const start = Date.now();
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log('Query eseguita:', { text, duration, rows: res.rowCount });
//     return res;
//   } catch (error) {
//     console.error('Errore durante l_esecuzione della query:', { text, error: error.message });
//     throw error; // Rilancia l_errore per gestirlo nella route chiamante
//   }
// };

// --- Definizione delle API Routes ---

// Placeholder per l'autenticazione (da implementare)
const authenticate = (req, res, next) => {
  // Logica di autenticazione molto semplice per ora
  // In un'app reale, useresti token JWT, sessioni, ecc.
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === 'SUPER_SECRET_API_KEY') { // Chiave API di esempio
    next();
  } else if (req.method === 'GET') {
    next(); // Le richieste GET sono pubbliche
  }
  else {
    res.status(401).json({ message: 'Non autorizzato: Chiave API mancante o non valida.' });
  }
};


// Funzione di utility per inviare risposte
const sendResponse = (res, success, dataOrMessage, statusCode = 200) => {
  if (success) {
    res.status(statusCode).json(dataOrMessage);
  } else {
    res.status(statusCode).json({ message: dataOrMessage });
  }
};

// API per 'partite'
const partiteRouter = express.Router();
partiteRouter.get('/', async (req, res) => {
  // const { rows } = await pool.query('SELECT * FROM partite ORDER BY data DESC');
  // TODO: Recuperare dati da PostgreSQL
  sendResponse(res, true, rows || [{ id: 1, data: '2023-10-01', avversario: 'Squadra A (mock)', gol_fatti: 3, gol_subiti: 2, commento: 'Bella vittoria (mock)' }]);
});
partiteRouter.post('/', authenticate, async (req, res) => {
  // const { data, avversario, gol_fatti, gol_subiti, commento } = req.body;
  // const { rows } = await pool.query('INSERT INTO partite (data, avversario, gol_fatti, gol_subiti, commento) VALUES ($1, $2, $3, $4, $5) RETURNING *', [data, avversario, gol_fatti, gol_subiti, commento]);
  // TODO: Inserire dati in PostgreSQL
  console.log('Dati ricevuti per POST /partite:', req.body);
  sendResponse(res, true, { message: 'Partita creata con successo', data: rows ? rows[0] : req.body }, 201);
});
partiteRouter.put('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // const { data, avversario, gol_fatti, gol_subiti, commento } = req.body;
  // const { rows } = await pool.query('UPDATE partite SET data = $1, avversario = $2, gol_fatti = $3, gol_subiti = $4, commento = $5 WHERE id = $6 RETURNING *', [data, avversario, gol_fatti, gol_subiti, commento, id]);
  // TODO: Aggiornare dati in PostgreSQL
  console.log(`Dati ricevuti per PUT /partite/${req.params.id}:`, req.body);
  sendResponse(res, true, { message: `Partita ${req.params.id} aggiornata`, data: rows ? rows[0] : req.body });
});
partiteRouter.delete('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // await pool.query('DELETE FROM partite WHERE id = $1', [id]);
  // TODO: Eliminare dati da PostgreSQL
  console.log(`Richiesta DELETE /partite/${req.params.id}`);
  sendResponse(res, true, { message: `Partita ${req.params.id} eliminata` });
});
app.use('/api/partite', partiteRouter);


// API per 'prossime_partite'
const prossimePartiteRouter = express.Router();
prossimePartiteRouter.get('/', async (req, res) => {
  // const { rows } = await pool.query('SELECT * FROM prossime_partite ORDER BY data ASC');
  sendResponse(res, true, rows || [{ id: 1, data: '2023-10-10', avversario: 'Squadra B (mock)', ora: '21:00', luogo: 'Campo Est (mock)' }]);
});
prossimePartiteRouter.post('/', authenticate, async (req, res) => {
  // const { data, avversario, ora, luogo } = req.body;
  // const { rows } = await pool.query('INSERT INTO prossime_partite (data, avversario, ora, luogo) VALUES ($1, $2, $3, $4) RETURNING *', [data, avversario, ora, luogo]);
  console.log('Dati ricevuti per POST /prossime_partite:', req.body);
  sendResponse(res, true, { message: 'Prossima partita creata', data: rows ? rows[0] : req.body }, 201);
});
prossimePartiteRouter.put('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // const { data, avversario, ora, luogo } = req.body;
  // const { rows } = await pool.query('UPDATE prossime_partite SET data = $1, avversario = $2, ora = $3, luogo = $4 WHERE id = $5 RETURNING *', [data, avversario, ora, luogo, id]);
  console.log(`Dati ricevuti per PUT /prossime_partite/${req.params.id}:`, req.body);
  sendResponse(res, true, { message: `Prossima partita ${req.params.id} aggiornata`, data: rows ? rows[0] : req.body });
});
prossimePartiteRouter.delete('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // await pool.query('DELETE FROM prossime_partite WHERE id = $1', [id]);
  console.log(`Richiesta DELETE /prossime_partite/${req.params.id}`);
  sendResponse(res, true, { message: `Prossima partita ${req.params.id} eliminata` });
});
app.use('/api/prossime_partite', prossimePartiteRouter);


// API per 'news'
const newsRouter = express.Router();
newsRouter.get('/', async (req, res) => {
  // const { rows } = await pool.query('SELECT * FROM news ORDER BY data_pubblicazione DESC');
  sendResponse(res, true, rows || [{ id: 1, titolo: 'Grande Annuncio (mock)', testo: 'Qualcosa di importante è successo! (mock)', data_pubblicazione: '2023-10-05' }]);
});
newsRouter.post('/', authenticate, async (req, res) => {
  // const { titolo, testo, data_pubblicazione } = req.body; // data_pubblicazione può essere DEFAULT CURRENT_DATE
  // const { rows } = await pool.query('INSERT INTO news (titolo, testo, data_pubblicazione) VALUES ($1, $2, $3) RETURNING *', [titolo, testo, data_pubblicazione || new Date()]);
  console.log('Dati ricevuti per POST /news:', req.body);
  sendResponse(res, true, { message: 'News creata', data: rows ? rows[0] : req.body }, 201);
});
newsRouter.put('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // const { titolo, testo, data_pubblicazione } = req.body;
  // const { rows } = await pool.query('UPDATE news SET titolo = $1, testo = $2, data_pubblicazione = $3 WHERE id = $4 RETURNING *', [titolo, testo, data_pubblicazione, id]);
  console.log(`Dati ricevuti per PUT /news/${req.params.id}:`, req.body);
  sendResponse(res, true, { message: `News ${req.params.id} aggiornata`, data: rows ? rows[0] : req.body });
});
newsRouter.delete('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // await pool.query('DELETE FROM news WHERE id = $1', [id]);
  console.log(`Richiesta DELETE /news/${req.params.id}`);
  sendResponse(res, true, { message: `News ${req.params.id} eliminata` });
});
app.use('/api/news', newsRouter);


// API per 'giocatori'
const giocatoriRouter = express.Router();
giocatoriRouter.get('/', async (req, res) => {
  // const { rows } = await pool.query('SELECT * FROM giocatori ORDER BY nome ASC');
  sendResponse(res, true, rows || [{ id: 1, nome: 'Mario Rossi (mock)', ruolo: 'Attaccante', numero_maglia: 9, foto: 'url_foto_mario_mock.jpg' }]);
});
giocatoriRouter.post('/', authenticate, async (req, res) => {
  // const { nome, ruolo, numero_maglia, foto } = req.body;
  // const { rows } = await pool.query('INSERT INTO giocatori (nome, ruolo, numero_maglia, foto) VALUES ($1, $2, $3, $4) RETURNING *', [nome, ruolo, numero_maglia, foto]);
  console.log('Dati ricevuti per POST /giocatori:', req.body);
  sendResponse(res, true, { message: 'Giocatore creato', data: rows ? rows[0] : req.body }, 201);
});
giocatoriRouter.put('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // const { nome, ruolo, numero_maglia, foto } = req.body;
  // const { rows } = await pool.query('UPDATE giocatori SET nome = $1, ruolo = $2, numero_maglia = $3, foto = $4 WHERE id = $5 RETURNING *', [nome, ruolo, numero_maglia, foto, id]);
  console.log(`Dati ricevuti per PUT /giocatori/${req.params.id}:`, req.body);
  sendResponse(res, true, { message: `Giocatore ${req.params.id} aggiornato`, data: rows ? rows[0] : req.body });
});
giocatoriRouter.delete('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // await pool.query('DELETE FROM giocatori WHERE id = $1', [id]);
  console.log(`Richiesta DELETE /giocatori/${req.params.id}`);
  sendResponse(res, true, { message: `Giocatore ${req.params.id} eliminato` });
});
app.use('/api/giocatori', giocatoriRouter);


// API per 'sponsor'
const sponsorRouter = express.Router();
sponsorRouter.get('/', async (req, res) => {
  // const { rows } = await pool.query('SELECT * FROM sponsor ORDER BY nome ASC');
  sendResponse(res, true, rows || [{ id: 1, nome: 'Sponsor Ufficiale (mock)', logo: 'url_logo_sponsor_mock.png', link: 'http://sponsor_mock.com' }]);
});
sponsorRouter.post('/', authenticate, async (req, res) => {
  // const { nome, logo, link } = req.body;
  // const { rows } = await pool.query('INSERT INTO sponsor (nome, logo, link) VALUES ($1, $2, $3) RETURNING *', [nome, logo, link]);
  console.log('Dati ricevuti per POST /sponsor:', req.body);
  sendResponse(res, true, { message: 'Sponsor creato', data: rows ? rows[0] : req.body }, 201);
});
sponsorRouter.put('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // const { nome, logo, link } = req.body;
  // const { rows } = await pool.query('UPDATE sponsor SET nome = $1, logo = $2, link = $3 WHERE id = $4 RETURNING *', [nome, logo, link, id]);
  console.log(`Dati ricevuti per PUT /sponsor/${req.params.id}:`, req.body);
  sendResponse(res, true, { message: `Sponsor ${req.params.id} aggiornato`, data: rows ? rows[0] : req.body });
});
sponsorRouter.delete('/:id', authenticate, async (req, res) => {
  // const { id } = req.params;
  // await pool.query('DELETE FROM sponsor WHERE id = $1', [id]);
  console.log(`Richiesta DELETE /sponsor/${req.params.id}`);
  sendResponse(res, true, { message: `Sponsor ${req.params.id} eliminato` });
});
app.use('/api/sponsor', sponsorRouter);

// Servire file statici per l'interfaccia di amministrazione
app.use('/admin', express.static(path.join(__dirname, 'admin_views')));

// Route di base per testare il server
app.get('/', (req, res) => {
  res.send('Server backend per Corbiolo Calcetto funzionante! <br><br> <a href="/admin/admin_home.html">Vai all_ interfaccia di Amministrazione</a>');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server backend in ascolto sulla porta ${PORT}`);
  console.log(`Prova ad accedere a http://localhost:${PORT}/api/partite per vedere i dati mock.`);
  console.log('Per le operazioni di scrittura (POST, PUT, DELETE), includi header x-api-key: SUPER_SECRET_API_KEY');
});

// Aggiungi uno script 'start' al package.json se non esiste
const fs = require('fs');
const packageJsonPath = path.join(__dirname, 'package.json'); // Assumendo che server.js sia in backend/
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
if (!packageJson.scripts) {
  packageJson.scripts = {};
}
if (!packageJson.scripts.start) {
  packageJson.scripts.start = 'node server.js';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Aggiunto script 'start' a package.json: node server.js");
}
