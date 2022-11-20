
const { response, request } = require('express');
const mysql = require("mysql");
const conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));

//  LIST PACIENTES
const getEspecie = (req, res = response) => {
    const id = req.params.id;
    sqlGetEspecie(conexion, id, (result) => {
        res.send(result.length?result : "no existen datos");
    })

}
const sqlGetEspecie = (conexion,id ,callback) => {
    //console.log( conexion );
    let strSql = (id >= 0)? 
                `SELECT * FROM especie WHERE id='${id}' ; `:
                `SELECT * FROM especie ORDER BY id ASC; `;
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}

//  ADD-UPDATE PACIENTE
const setEspecie = (req = request, res = response) => {
    const especie = req.body;
    sqlSetEspecie(conexion, especie, (result) => {
        res.send(result);
    })

}
const sqlSetEspecie = (conexion, especie, callback) => {
    let strSql = '';
    if (!!especie['id']) {
        strSql =
            " UPDATE especie SET "
            + `nombre = "${especie['nombre']}" , `
            + `caracteristicas = "${especie['caracteristicas']}" , `
            + `imagen = "${especie['imagen']}"  WHERE id = ${especie['id']} `;
    } else {
        strSql =
            " INSERT INTO especie (nombre, caracteristicas, imagen) " +
            ` VALUES ( "${especie['nombre']}", "${especie['caracteristicas']}", "${especie['imagen']}" ); `
    }
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}


const deleteEspecie = (req = request, res = response) => {
    const id = req.params.id;
    sqlDelEspecie(conexion, id, (result) => {
        res.send(result);
    })

}
const sqlDelEspecie = (conexion, id, callback) => {
    let strSql = `DELETE FROM especie  WHERE id = ${id} `;
    //console.log(strSql)
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}

module.exports = {
    getEspecie,
    setEspecie,
    deleteEspecie
}