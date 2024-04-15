const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors'); // Asegúrate de instalar cors: npm install cors

const routes = require('./routes')

const app = express();
app.set('port', process.env.PORT || 8000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '15911',
    database: 'tarea'
}

//middlewares
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())

// Habilitar CORS
app.use(cors());

app.get('/', (req,res)=>{
    res.send('Bienvenido')
})

app.use('/api', routes)

//servidor corriendo
app.listen(app.get('port'), ()=>{
    console.log('server running on port',app.get('port'))
})
