# 💜 J0X EVENT SYSTEM

Sistema completo di prenotazione eventi per Discord, integrato nel bot **joxerino**.

## 🎯 Caratteristiche

- **Prenotazione eventi** direttamente su Discord
- **Gestione automatica** dei posti e lista d'attesa
- **Interfaccia visiva** con embed eleganti e pulsanti interattivi
- **Comandi amministrativi** completi per gestione eventi
- **Database SQLite** per persistenza dati
- **Notifiche automatiche** quando si liberano posti (DM)
- **Stile J0X** con colori viola neon, rosa e ciano

## 📋 Requisiti

- Node.js 18+ 
- Discord Bot Token
- Discord Application con permessi:
  - `bot`
  - `applications.commands`
  - `Send Messages`
  - `Embed Links`
  - `Read Message History`
  - `Use Slash Commands`

## 🚀 Installazione

1. **Clona o scarica il progetto:**
   ```bash
   cd joxerino
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente:**
   - Copia `.env.example` in `.env`
   - Inserisci il tuo Discord Bot Token
   - Inserisci il tuo Client ID
   - (Opzionale) Inserisci il Guild ID per deploy rapido

   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_discord_client_id_here
   GUILD_ID=your_guild_id_here
   ```

4. **Registra i comandi slash:**
   ```bash
   npm run deploy
   ```

5. **Avvia il bot:**
   ```bash
   npm start
   ```

## 🎮 Comandi Disponibili

### Comandi Amministrativi

Tutti i comandi richiedono permesso di **Amministratore**.

#### `/evento crea`
Crea un nuovo evento.

**Opzioni:**
- `titolo` (richiesto) - Titolo dell'evento
- `descrizione` (opzionale) - Descrizione dell'evento
- `data` (opzionale) - Data in formato DD/MM/YYYY
- `orario` (opzionale) - Orario in formato HH:MM
- `posti` (opzionale) - Numero max partecipanti (default: 9)
- `immagine` (opzionale) - URL dell'immagine/banner
- `canale` (opzionale) - Canale dove pubblicare
- `lista_attesa` (opzionale) - Abilita lista d'attesa (default: true)

**Esempio:**
```
/evento crea titolo:"Fortnite Community Night" data:"20/11/2026" orario:"21:30" posti:9
```

#### `/evento modifica`
Modifica un evento esistente.

**Opzioni:**
- `id` (richiesto) - ID dell'evento
- `titolo` (opzionale) - Nuovo titolo
- `descrizione` (opzionale) - Nuova descrizione
- `data` (opzionale) - Nuova data
- `orario` (opzionale) - Nuovo orario
- `posti` (opzionale) - Nuovo numero posti
- `immagine` (opzionale) - Nuova immagine
- `lista_attesa` (opzionale) - Abilita/disabilita lista

#### `/evento elimina`
Elimina definitivamente un evento.

**Opzioni:**
- `id` (richiesto) - ID dell'evento

#### `/evento chiudi`
Chiude temporaneamente le iscrizioni.

**Opzioni:**
- `id` (richiesto) - ID dell'evento

#### `/evento apri`
Ri apre le iscrizioni di un evento chiuso.

**Opzioni:**
- `id` (richiesto) - ID dell'evento

#### `/evento partecipanti`
Visualizza tutti i partecipanti di un evento.

**Opzioni:**
- `id` (richiesto) - ID dell'evento

#### `/evento rimuovi`
Rimuove manualmente un partecipante.

**Opzioni:**
- `id` (richiesto) - ID dell'evento
- `utente` (richiesto) - Utente da rimuovere

## 🎟️ Prenotazione Utenti

Gli utenti possono prenotare direttamente dai pulsanti nel messaggio dell'evento:

- **🎟️ PRENOTA** - Prenota il primo posto disponibile
- **❌ ANNULLA PRENOTAZIONE** - Cancella la propria prenotazione
- **👥 ENTRA IN LISTA D'ATTESA** - Si aggiunge alla lista quando evento completo
- **🚪 ESCI DALLA LISTA** - Esce dalla lista d'attesa

## 🔧 Funzionalità

### Sistema di Prenotazione
- Un solo posto per utente per evento
- Assegnazione automatica del primo posto libero
- Protezione contro prenotazioni simultanee
- Messaggi di errore ephemeral

### Lista d'Attesa
- Attivabile/disattivabile per evento
- Notifica DM quando si libera un posto
- Promozione automatica del primo in lista
- Possibilità di uscire dalla lista

### Aggiornamenti Automatici
- Il messaggio dell'evento si aggiorna in tempo reale
- Barra di progresso delle iscrizioni
- Elenco partecipanti sempre aggiornato
- Stato posti disponibili

### Database
- SQLite per persistenza dati
- Backup automatico delle prenotazioni
- Recupero stato dopo riavvio bot
- Gestione transazioni

## 📁 Struttura Progetto

```
joxerino/
├── commands/
│   └── evento/
│       ├── crea.js
│       ├── modifica.js
│       ├── elimina.js
│       ├── chiudi.js
│       ├── apri.js
│       ├── partecipanti.js
│       └── rimuovi.js
├── database/
│   ├── database.js
│   └── joxerino.db (creato automaticamente)
├── events/
│   └── interactionHandler.js
├── utils/
│   ├── commandLoader.js
│   └── embedBuilder.js
├── index.js
├── deploy-commands.js
├── package.json
├── .env.example
└── README.md
```

## 🎨 Stile Visivo

Il sistema utilizza i colori J0X:
- **Viola neon:** `#a855f7`
- **Rosa neon:** `#ff2bd6`
- **Ciano:** `#00eaff`
- **Nero profondo:** `#1a1a2e`

## 🔒 Sicurezza

- Comandi amministrativi protetti da permessi Discord
- Validazione input utente
- Protezione SQL injection
- Gestione errori completa
- Log operazioni

## 🐛 Troubleshooting

### Comandi non appaiono
- Esegui `npm run deploy` per registrare i comandi
- Verifica che il bot abbia permesso `applications.commands`

### Database errori
- Verifica che la cartella `database/` sia scrivibile
- Il file `joxerino.db` viene creato automaticamente

### Messaggi non si aggiornano
- Verifica che il bot abbia permesso `Read Message History`
- Controlla che il messaggio dell'evento non sia stato eliminato

### Notifiche DM non funzionano
- Verifica che il bot possa inviare DM agli utenti
- Gli utenti devono avere DM abilitati nel server

## 📝 Note Importanti

- Il bot deve essere online per le prenotazioni
- Il database viene salvato localmente
- Fai backup regolarmente del file `joxerino.db`
- I comandi slash richiedono tempo per propagarsi globalmente

## 🤝 Supporto

Per problemi o domande, contatta l'amministratore del server.

---

**💜 J0X EVENT SYSTEM - Creato per la community J0X**
