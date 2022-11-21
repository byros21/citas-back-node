
const { response, request } = require('express');
const mysql = require("mysql");
const conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));

//  LIST PACIENTES
const getMascota = (req, res = response) => {
    const id = req.params.id || -1;
    sqlGetMascota(conexion, id, (result) => {
        res.send(result.length ? result : "no existen datos");
    })

}
const sqlGetMascota = (conexion, id, callback) => {
    let strSql = `SELECT * FROM mascotas WHERE id='${id}' ;`
    if (id == -1) {
        strSql = `SELECT * FROM mascotas ORDER BY fecha DESC; `;
    }
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}

//  ADD-UPDATE PACIENTE
const setMascota = (req = request, res = response) => {
    const mascota = req.body;
    if (mascota.nombre && mascota.propietario && mascota.email && mascota.fecha && mascota.sintomas) {
        sqlSetMascota(conexion, mascota, (result) => {
            res.send(result);
        })
    } else {
        res.send('informacion de paciente imcompleta');
    }

}
const sqlSetMascota = (conexion, mascota, callback) => {
    let strSql = '';
    if (!!mascota['id']) {
        strSql =
            " UPDATE mascotas SET "
            + `nombre = "${mascota['nombre']}" , `
            + `propietario = "${mascota['propietario']}" , `
            + `email = "${mascota['email']}" , `
            + `fecha = "${mascota['fecha']}" , `
            + `sintomas = "${mascota['sintomas']}" `
            + ` WHERE id = ${mascota['id']} `;
        console.log('editado mascota -> ' + mascota['nombre']);
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


const deleteMascota = (req = request, res = response) => {
    const id = req.params.id;
    sqlDelMascota(conexion, id, (result) => {
        res.send(result);
    })

}
const sqlDelMascota = (conexion, id, callback) => {
    let strSql = `DELETE FROM mascotas  WHERE id = ${id} `;
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}

module.exports = {
    getMascota,
    setMascota,
    deleteMascota
}