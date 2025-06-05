# Backend U.S. Corbiolo Calcetto

Questo backend fornisce le API REST e un'interfaccia di amministrazione per l'applicazione web della squadra di calcetto U.S. Corbiolo.

## Prerequisiti

- Node.js (versione 14.x o superiore raccomandata)
- npm (generalmente incluso con Node.js)
- PostgreSQL (server in esecuzione)

## Setup

1.  **Clona il Repository:**
    Se non l'hai già fatto, clona l'intero repository. Questo backend si trova nella sottocartella `backend/`.

2.  **Installa Dipendenze:**
    Naviga nella cartella `backend` ed esegui:
    ```bash
    npm install
    ```

3.  **Configura il Database PostgreSQL:**
    a. Assicurati di avere un server PostgreSQL in esecuzione e accessibile.
    b. Crea un database (es. `corbiolo_calcetto`). Puoi usare `createdb corbiolo_calcetto` da riga di comando se hai i tool client di PostgreSQL.
    c. Esegui lo script SQL fornito per creare le tabelle necessarie. Connettiti al tuo database `corbiolo_calcetto` usando `psql` o un tool grafico ed esegui il contenuto di `database_setup.sql`:
       ```bash
       psql -U tuo_utente_db -d corbiolo_calcetto -f database_setup.sql
       ```
       Sostituisci `tuo_utente_db` con il tuo username PostgreSQL. Potrebbe esserti richiesta la password.

4.  **Configura le Variabili d'Ambiente:**
    Crea un file `.env` nella cartella `backend/` (puoi copiare da `.env.example`).
    Modifica il file `.env` con le tue credenziali del database:
    ```env
    DB_USER=il_tuo_utente_pg
    DB_HOST=localhost
    DB_NAME=corbiolo_calcetto
    DB_PASSWORD=la_tua_password_pg
    DB_PORT=5432
    # PORT=3000 # Porta per il server backend, opzionale, default 3000
    # API_KEY=SUPER_SECRET_API_KEY # Chiave per le operazioni di scrittura, opzionale, default SUPER_SECRET_API_KEY
    ```
    **Nota sulla API Key:** Il server usa una API Key statica per proteggere le operazioni di scrittura (POST, PUT, DELETE). Il valore di default è `SUPER_SECRET_API_KEY`. Puoi cambiarlo impostando la variabile `API_KEY` nel file `.env`. Questa chiave deve essere inclusa nell'header `x-api-key` delle richieste.

5.  **Avvia il Server Backend:**
    ```bash
    npm start
    ```
    Il server dovrebbe avviarsi (di default su `http://localhost:3000`). Vedrai messaggi di log nella console, incluso un tentativo di connessione al database.

## API Endpoints

Il server espone le seguenti API REST (base URL: `http://localhost:3000/api`):

-   **Partite Giocate:**
    -   `GET /partite`
    -   `POST /partite` (protetto)
    -   `PUT /partite/:id` (protetto)
    -   `DELETE /partite/:id` (protetto)
-   **Prossime Partite:**
    -   `GET /prossime_partite`
    -   `POST /prossime_partite` (protetto)
    -   `PUT /prossime_partite/:id` (protetto)
    -   `DELETE /prossime_partite/:id` (protetto)
-   **News:**
    -   `GET /news`
    -   `POST /news` (protetto)
    -   `PUT /news/:id` (protetto)
    -   `DELETE /news/:id` (protetto)
-   **Giocatori:**
    -   `GET /giocatori`
    -   `POST /giocatori` (protetto)
    -   `PUT /giocatori/:id` (protetto)
    -   `DELETE /giocatori/:id` (protetto)
-   **Sponsor:**
    -   `GET /sponsor`
    -   `POST /sponsor` (protetto)
    -   `PUT /sponsor/:id` (protetto)
    -   `DELETE /sponsor/:id` (protetto)

Per le richieste protette (POST, PUT, DELETE), includi l'header `x-api-key` con il valore definito nel tuo file `.env` o il default (`SUPER_SECRET_API_KEY`).

## Interfaccia di Amministrazione

Una semplice interfaccia di amministrazione è disponibile per gestire i dati. Una volta avviato il backend:

1.  Apri il tuo browser e vai a `http://localhost:3000/`.
2.  Clicca sul link "Vai all'interfaccia di Amministrazione".
3.  Questo ti porterà a `http://localhost:3000/admin/admin_home.html`.
4.  Da qui, puoi navigare per gestire News, Partite, Giocatori, ecc.
5.  Nelle pagine di gestione, inserisci la API Key (default: `SUPER_SECRET_API_KEY`) nell'apposito campo per abilitare le operazioni di creazione, modifica ed eliminazione.
