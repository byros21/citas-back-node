
const { response, request } = require('express');
const mysql = require("mysql");
const conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));

//  LIST PACIENTES
const getMascota = (req, res = response) => {
    const id = req.params.id;
    sqlGetMascota(conexion, id, (result) => {
        res.send(result);
    })

}
const sqlGetMascota = (conexion,id ,callback) => {
    //console.log( conexion );
    let strSql = (id >= 0)? 
                `SELECT * FROM mascotas WHERE id='${id}' ; `:
                `SELECT * FROM mascotas ORDER BY fecha DESC; `;
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}

//  ADD-UPDATE PACIENTE
const setMascota = (req = request, res = response) => {
    const mascota = req.body;
    sqlSetMascota(conexion, mascota, (result) => {
        res.send(result);
    })

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
    //console.log(strSql)
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