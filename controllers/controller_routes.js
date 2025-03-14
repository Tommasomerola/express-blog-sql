// importiamo il file di connessione al database
const connection = require('../data/db');

// funzione INDEX
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM posts'

    // eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: 'Database query failed' });

        res.json(results);
    });
}

// funzione SHOW
function show(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // prepariamo la query
    const sql = `
        SELECT 
            posts.*,
            GROUP_CONCAT(tags.label SEPARATOR ', ') AS tags
        FROM posts 
        JOIN post_tag ON posts.id = post_tag.post_id
        JOIN tags ON post_tag.tag_id = tags.id
        WHERE posts.id = ?`;

    // eseguiamo la query per mostrare un singolo post
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    })
}

// funzione STORE
function store(req, res) {

    // Recupera i dati dal body della richiesta
    const { title, content, image } = req.body;

    // Query SQL per inserire un nuovo post
    const sql = `INSERT INTO posts (title, content, image)  VALUES (?, ?, ?)`;

    // Eseguiamo la query
    connection.query(sql, [title, content, image], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (result.length === 0) return res.status(404).json({ error: 'post non creato' });
        res.json(result[0])
    });
}

// funzione update
function update(req, res) {

    const id = req.params.id
    // Recupera i dati dal body della richiesta
    const { title, content, image } = req.body;

    // Query SQL per inserire un nuovo post
    const sql = `
        UPDATE posts 
        SET 
        title = ?,
        content = ?,
        image = ?
        WHERE id= ? `;

    // Eseguiamo la query
    connection.query(sql, [title, content, image, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'post non trovato' });
        res.json(result[0])

    });
}

// funzione DESTROY
function destroy(req, res) {

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // prepariamo la query
    const sql = 'DELETE FROM posts WHERE; id = ?';

    // eseguiamo la query ed eliminiamo il post
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });

}

module.exports = { index, show, store, update, destroy }