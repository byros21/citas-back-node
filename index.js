
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Node.JS Backend Citas");
});

//console.log("Server On : ", port);

app.listen(port, () => {
    console.log("Server On : ", port);
});

let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    database: 'sql10578584',
    user: 'sql10578584',
    password: 'QVBZhtxldg'
});


conexion.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log('**OK', error);
    }
});

app.get("/mascotas", (req, res) => {
    getMascotas(conexion, (result) => {
        res.send(
            result
        );
    })

});

app.post("/mascota", (req, res) => {
    const mascota = req.body;
    setMascota(conexion, mascota, (result) => {
        res.send(
            result
        );
    })

});

app.put("/mascota", (req, res) => {
    const mascota = req.body;
    setMascota(conexion, mascota, (result) => {
        res.send(
            result
        );
    })

});


app.delete("/mascota/:id", (req, res) => {
    const id = req.params.id;
    deleteMascota(conexion, id, (result) => {
        res.send(
            result
        );
    })

});

function getMascotas(conexion, callback) {
    const strSql =
        " SELECT * FROM mascotas ORDER BY fecha DESC;"
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}

function setMascota(conexion, mascota, callback) {
    
    let  strSql = '';
    if (!!mascota['id']) {
        strSql =
            " UPDATE mascotas SET "
            + `nombre = "${mascota['nombre']}" , `
            + `propietario = "${mascota['propietario']}" , `
            + `email = "${mascota['email']}" , `
            + `fecha = "${mascota['fecha']}" , `
            + `sintomas = "${mascota['sintomas']}" `
            + ` WHERE id = ${mascota['id']} `;
    } else {
        strSql =
            " INSERT INTO mascotas (nombre, propietario, email, fecha, sintomas) " +
            ` VALUES ( "${mascota['nombre']}", "${mascota['propietario']}", "${mascota['email']}", "${mascota['fecha']}", "${mascota['sintomas']}" ); `
    }
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}


function deleteMascota(conexion, id, callback) {
    let  strSql = `DELETE FROM mascotas  WHERE id = ${id} `;
    console.log(strSql)
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}

//conexion.end();
