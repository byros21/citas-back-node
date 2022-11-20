
const express = require("express");
const cors = require("cors");

const dirMascota = '/mascota';
const dirEspecie = '/especie';

const mysql = require("mysql");
const { env } = require("process");


class Server {
    
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        
        this.conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));
        
        this.middlewares();
        this.routes();

    }

    getConexion(){
        return this.conexion;
    }

    middlewares() {
        //Directorio publico
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {

        this.app.get("/api", (req, res) => {
            res.send("API Node.JS Backend Citas");
        });

        this.app.use(dirMascota, require('../routes/mascota'))
        this.app.use(dirEspecie, require('../routes/especie'))

    }

    iniciar() {

        this.app.listen(this.port, () => {
            console.log("Server On : ", this.port);
        });

    }
}

module.exports = Server;