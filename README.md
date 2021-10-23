# Alkemy Warm Up Challenge: Blog API
## Installation

Instalar mediante NPM:

```bash
npm install
```


Para ejecutar una versión local, se requiere disponer en funcionamiento una base de datos mysql, ya sea de forma local o remota.

Además se deberá crear un archivo .env, el cual contenrá las siguientes variables de entorno:

```bash
# CUSTOM PORT
CUSTOM_PORT=****

# DATABASE PARAMS
DB_USERNAME=****
DB_PASSWORD=****
DB_DATABASE=****
DB_HOST=****
DB_PORT=3306
DB_DIALECT=mysql 
```

La librería *dotenv* configura automáticamente dichas variables a partir de este archivo.

Iniciar el servidor con el comando:
```bash
npm start
```
De manera opcional, se puede iniciar el servidor con *nodemon* con el siguiente comando:

```bash
npm run dev

```
