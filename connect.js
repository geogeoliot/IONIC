import mysql from 'mysql'

const connect = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'article'
})

connect.connect(function(err) {
    if(err) {
        console.error('error connecting: ' + err.error);
        return
    } else {
        console.log(`[OK] ► Bdd is on`.green)
    }
})

export default connect 