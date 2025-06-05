-- Script per configurare il database corbiolo_calcetto in PostgreSQL

-- Disconnetti tutte le sessioni attive dal database target prima di tentare di eliminarlo (opzionale, ma utile per la ricreazione)
-- SELECT pg_terminate_backend(pg_stat_activity.pid)
-- FROM pg_stat_activity
-- WHERE pg_stat_activity.datname = 'corbiolo_calcetto'
--  AND pid <> pg_backend_pid();

-- Elimina il database se esiste già (per permettere una facile ricreazione pulita)
-- DROP DATABASE IF EXISTS corbiolo_calcetto;

-- Crea il database (ignora l'errore se esiste già)
-- In psql, esegui questo comando mentre sei connesso a un database di manutenzione come 'postgres' o 'template1'
-- Esempio: psql -U postgres -c "CREATE DATABASE corbiolo_calcetto"
-- Per questo script, assumiamo che il database venga creato esternamente o che l'utente si connetta al db corretto.

-- *** Importante: Connettiti al database 'corbiolo_calcetto' prima di eseguire il resto dello script ***
-- Esempio in psql: \c corbiolo_calcetto

CREATE TABLE IF NOT EXISTS partite (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    avversario VARCHAR(255) NOT NULL,
    gol_fatti INTEGER,
    gol_subiti INTEGER,
    commento TEXT
);

CREATE TABLE IF NOT EXISTS prossime_partite (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    avversario VARCHAR(255) NOT NULL,
    ora TIME,
    luogo VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL,
    testo TEXT NOT NULL,
    data_pubblicazione DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS giocatori (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ruolo VARCHAR(100),
    numero_maglia INTEGER,
    foto VARCHAR(255) -- URL o percorso del file
);

CREATE TABLE IF NOT EXISTS sponsor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    logo VARCHAR(255), -- URL del logo
    link VARCHAR(255)
);

-- Concedi i privilegi all'utente appropriato (sostituisci 'tuo_utente_db' con l'utente reale)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tuo_utente_db;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tuo_utente_db;

SELECT 'Tabelle create con successo nel database corbiolo_calcetto (se connesso correttamente).' AS status;
