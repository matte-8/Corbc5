# Progetto U.S. Corbiolo Calcetto Web App

## Backend

Il backend di questa applicazione è sviluppato in Node.js con Express.js e utilizza un database PostgreSQL.
Fornisce API REST per la gestione dei dati della squadra (partite, news, giocatori, sponsor) e un'interfaccia di amministrazione web.

**Per istruzioni dettagliate su come configurare, avviare e utilizzare il backend, consulta il file `backend/README.md`.**

### Avvio Rapido Backend (sintesi)
1.  Assicurati che PostgreSQL sia installato e in esecuzione.
2.  Configura il database usando `backend/database_setup.sql`.
3.  Configura le variabili d'ambiente in `backend/.env` (copia da `backend/.env.example`).
4.  Naviga in `cd backend`.
5.  Installa le dipendenze: `npm install`.
6.  Avvia il server: `npm start`.
Il backend sarà accessibile su `http://localhost:3000`.

## Frontend

Le pagine HTML del frontend si trovano nella root del progetto (es. `index.html`, `news.html`, ecc.).
Queste pagine sono state modificate per caricare dinamicamente i dati dal backend.

**Per visualizzare il frontend:**
1.  Assicurati che il server backend sia in esecuzione (vedi sezione Backend).
2.  Apri i file HTML (es. `index.html`, `news.html`) direttamente nel tuo browser web.
    - Esempio: `file:///percorso/completo/del/tuo/progetto/news.html`
    - Oppure, se servi la root del progetto tramite un server web locale (es. Live Server di VSCode), accedi tramite l'URL fornito da quel server.

I dati verranno recuperati dalle API del backend (default: `http://localhost:3000/api/...`). Se il backend non è attivo o raggiungibile, le sezioni dinamiche delle pagine mostreranno messaggi di errore o di caricamento.
