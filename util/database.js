import sqlite from 'sqlite3'

const db = new sqlite.Database('./data/database.sqlite');

export function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}
export function dbRun(sql, params = []){
    return new Promise((resolve, reject) => {
        db.run(sql,params,function(err){
            if(err){
                reject(err);
            }
            else{
                resolve(this);
            }
        });
    });
}
export async function ItitalizeDatabase(){
    await dbRun("DROP TABLE IF EXISTS albums");
    await dbRun("CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY AUTOINCREMENT, band STRING, title STRING, length INTEGER, release INTEGER)");

    const albums = [
        { band: 'Tupac Shakur', title: 'Changes', length: 292, release: 1998 },
        { band: 'The Notorious B.I.G.', title: 'Juicy', length: 300, release: 1994 },
        { band: 'Kendrick Lamar', title: 'HUMBLE.', length: 177, release: 2017 },
        { band: 'Nas', title: 'N.Y. State of Mind', length: 290, release: 1994 },
        { band: 'Jay-Z', title: '99 Problems', length: 211, release: 2003 },
        { band: 'Eminem', title: 'Lose Yourself', length: 326, release: 2002 }
    ];

    for (const album of albums) {
        await dbRun("INSERT INTO albums (band, title, length, release) VALUES (?,?,?,?)", [album.band, album.title, album.length, album.release]);
    }
}