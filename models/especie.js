
const { Schema, model } = require('')

const EspecieSchema = Schema({
    id: {
        type: Number
    },
    nombre: {
        type: String,
        require: [true, 'el Nombre es obrigatorio']
    },
    caracteristicas: {
        type: String
    },
    imagen: {
        type: String
    }
})


module.exports = model( 'Especie' )