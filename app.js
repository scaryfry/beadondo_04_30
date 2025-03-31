import express from 'express';
import cors from 'cors';  
import { ItitalizeDatabase, dbAll, dbGet, dbRun } from './util/database.js';

const app = express();

app.use(cors());  
app.use(express.json());


app.get('/albums', async (req, res) => {
    const albums = await dbAll("SELECT * FROM albums");
    res.status(200).json(albums);
});

app.get('/albums/:id', async (req, res) => {
    const { id } = req.params;
    const albums = await dbGet("SELECT * FROM albums WHERE id = ?", [id]);
    if (!albums) {
        return res.status(404).json({ message: 'Album not found' });
    }
    res.status(200).json(albums);
});

app.put('/albums/:id', async (req, res) => {
    const { id } = req.params;
    const { band, title, length, release } = req.body;
    await dbRun("UPDATE albums SET band = ?, title = ?, length = ?, release = ? WHERE id = ?", [band, title, length, release,id]);
    res.status(200).json({ message: 'Album updated' });
});

app.post('/albums', async (req, res) => {
    const {band, title, length, release } = req.body;
    await dbRun("INSERT INTO albums (band, title, length, release) VALUES (?,?,?,?)", [band, title, length, release]);
    res.status(201).json({ message: 'Album created' });
});
app.delete('/albums/:id', async (req, res) => {
    const { id } = req.params;
    await dbRun("DELETE FROM albums WHERE id = ?", [id]);
    res.status(200).json({ message: 'Album deleted' });
});

async function StartServer() {
    await ItitalizeDatabase();
}

app.listen(3000, async () => {
    console.log('Server is running on port 3000');
    }
);
StartServer();