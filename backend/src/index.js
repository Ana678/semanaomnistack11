const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors(
    //origin: 'http://exemplo.com'
));
app.use(express.json());
app.use(routes);

/*
ROTA / RECURSO
*/

/*
    GET - busca informaç~ioes de back-end
    POST - criar uma informação
    PUT - alterar informação
    DELETE - deleta informações
*/

/* -- TIPOS DE PARAMENTROS --

    query params: parametros nomeados enviados na rota apos "?" (filtros,paginação)
    route params: parametros utilizados para identificar recursos 
    request body: corpo da requisição usado para criar ou alterar recursos 
*/
/* -- BDD --

    sql: 
    DRIVER:  SELECT * FROM users
    QUERY BUILDER: table('users').select('*').where()

*/

app.listen(3333);
