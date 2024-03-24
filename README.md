# VegFlavor

## Sito web di ricette vegane
### Descrizione 
Il progetto sviluppato è una SPA di condivisione delle ricette vegane
### Funzionalità
Questo sito (ancora in via di sviluppo) permette:
- Registrare ed autenticare un nuovo utente
- Visualizzare, in formato paginato, tutte le ricette o ciascuna singolarmente in dettaglio
- Se l'utente è autenticato:
  - Aggiungere una nuova ricetta
  - Visitare il proprio profilo e le proprie ricette pubblicate
### Tecnologie
#### Frontend
Per lo sviluppo del lato frontend è stato utilizzato Angular17, nel particolare sono state utilizzate librerie come:
- boostrap 5 per lo sviluppo di un sito responsive 
- auth0/angular-jwt per la gestione del jwt 
- inoltre sono state utilizzate angular/common, angular/route e angular/forms per permettere le varie funzionalità del sito
 
#### Backend
Per lo sviluppo del lato backend è stato utilizzato node.js con express mentre per la persistenza dei dati un db mysql
utilizzato tramite l'orm sequelize.
Per la sicurezza sono state utilizzate le seguenti librerie:
- express-validator con la funzione escape() per mitigare xss
- hpp per impedire http parameter pollution
- helmet che aggiunge degli header per la sicurezza nella response
- express rate limiter per proteggere il server limitando le richieste
- jsonwebtoken per l'autenticazione degli utenti
- bcrypt per la crittografia delle password
- cors è abilitato con origine permessa solo il frontend
  
index.js è il main file del backend.
### Componenti
Belenchia Valerio, Dottori Edoardo, Perini Michele, Santolini Alice
