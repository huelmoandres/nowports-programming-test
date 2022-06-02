# nowports-programming-test

Proyecto de prueba, no contiene el total de las funcionalidades pedidas.

## Pasos a seguir

Estando ubicados en la carpeta del proyecto "nowports-programming-test" ejecutar:

### `docker-compose up -d`

Si lo desean pueden realizar lo siguiente:

### `docker-compose build`
### `docker-compose up -d`

Una vez que los servicios esten corriendo de forma correcta, abrir una terminal y ejecutar:

### `docker exec -it nowports-api-ms sh`
### `npx sequelize-cli db:migrate`
### `npx sequelize-cli db:seed:all`

Para comenzar a probar la aplicación, navegar hasta "http://localhost:3000"