const sqlite3 = require("sqlite3").verbose()

const dbFille = 'db.sqlite'
    // se connecter a la base de donnees
let db = new sqlite3.Database(dbFille, (err) => {
    if (err) {
        console.error(err.massage)
        throw err
    } else {
        console.log('connexion a la base sqllite3...')
        const sql = `CREATE TABLE article(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        description text,
        contenu text,
        auteur text,
        dateCree text,
        dateMaj text
        )`;
        db.run(sql, (err) => {
            if (err) {
                console.log('Creation de la table')
            }
        })
    }
})
module.exports = db;