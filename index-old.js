
require("dotenv").config();
const express = require("express");
const cors = require("cors");


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


//conexion.end();
