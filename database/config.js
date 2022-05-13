
const mongoose = require('mongoose')

const dbConnection = () => {
    try {
        mongoose.connect(process.env.DB_CNN).then(() => console.log('connected'))
            .catch(e => console.log(e));
        /*    const conn =  mongoose.createConnection(process.env.DB_CNN).
                asPromise();
            conn.readyState;
            if (conn.readyState == 1) {
                console.log('Conexion a base de datos');
            } else {
                console.log('No hay conexion a base de datos');
            }*/

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos ')
    }
}


module.exports = { dbConnection }