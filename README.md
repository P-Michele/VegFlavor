# VegFlavor

## Sito web di ricette vegane
### Descrizione 
Il progetto sviluppato è una piattaforma di condivisione delle ricette vegane. 
E' stato sviluppato un sito web denominato VegFlavor che permette di visualizzare le ricette e di poter interagire inserendone di nuove.
Il progetto è stato realizzato in formato SPA. 
Nel progetto come porta per la connessione del backend viene utilizzata la 3000 impostata nella componente environment del frontend
### Funzionalità
Questo sito (ancora in via di sviluppo) permette:
- Registrare ed autenticare un nuovo utente
- Visualizzare, in formato paginato, tutte le ricette o ciascuna singolarmente in dettaglio
- Aggiungere una nuova ricetta, se l'utente è autenticato
### Tecnologie
#### Frontend
Per lo sviluppo del lato frontend è stato utilizzato Angular17, nel particolare sono state utilizzate librerie come:
- boostrap 5 per lo sviluppo di un sito responsive 
- auth0/angular-jwt per la gestione del jwt 
- inoltre sono state utilizzate angular/common, angular/route e angular/forms per permettere le varie funzionalità del sito
 
#### Backend
Per lo sviluppo del lato backend sono state utilizzate librerie come:
- node js
- express
- escape xss
- sql injection orm
- hpp
- helmet
- express rate limiter
- validazione delle richieste
- jwt
- bcrypt
- cors
- mysql sequelize
  
Il file index.js è il file che fa partire il backend.
Viene utilizzato un db per il salvataggio delle ricette e degli utenti, è stato utilizzato MySql. Il database viene configurato utilizzando un file .env 
### Componenti
Belenchia Valerio, Dottori Edoardo, Perini Michele, Santolini Alice
