import pg from 'pg'

const { Client } = pg

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'styxa',
  password: '1234',
  port: 5432
})

await client.connect()

export function createUser() {
    client.query(`
        CREATE TABLE IF NOT EXISTS felhasznalok (
            id INT GENERATED ALWAYS AS IDENTITY,
            nev VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            datum TIMESTAMP,
            PRIMARY KEY (id)
        )`)
}

export async function getUsers() {
    const users = await client.query(`SELECT * FROM felhasznalok`)
    return users.rows
 }

export async function addUser(nev, email) {
    await client.query(`
        INSERT INTO felhasznalok (id, nev, email, datum)
        VALUES (default, '${nev}', '${email}', NOW())
    `)
}

export async function updateUser(id, nev, email) {
    const user = await client.query(`
        UPDATE felhasznalok
        SET nev = '${nev}', email = '${email}'
        WHERE id = ${id}
        `)
        return user.rows
}

export async function deleteUser(id) {
    const user = await client.query(`
        DELETE FROM felhasznalok
        WHERE id = ${id}
        `)
    return user.rows
}


//// Házi feladat
export function createCategory() {
    client.query(`
        CREATE TABLE IF NOT EXISTS kategoriak (
            id INT GENERATED ALWAYS AS IDENTITY,
            nev VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
        )`)
}


//// Házi feladat: SELECT, INSERT, UPDATE, DELETE

export async function getCategories() {
    const category = await client.query(`SELECT * FROM kategoriak`)
    return category.rows
 }

export async function addCategory(nev) {
    await client.query(`
        INSERT INTO kategoriak (id, nev)
        VALUES (default, '${nev}')
    `)
}

export async function updateCategory(id, nev) {
    const category = await client.query(`
        UPDATE kategoriak
        SET nev = '${nev}'
        WHERE id = ${id}
        `)
        return category.rows  
}

export async function deleteCategory(id) {
    const category = await client.query(`
        DELETE FROM kategoriak
        WHERE id = ${id}
        `)
    return category.rows
}


//// Cikkek

export function createCikkek() {
    client.query(`
        CREATE TABLE IF NOT EXISTS cikkek (
            cikkID INT GENERATED ALWAYS AS IDENTITY,
            cikkCim VARCHAR(40),
            cikkDatum TIMESTAMP,
            szerzoID INT,
            szoveg VARCHAR(255),

            PRIMARY KEY (cikkID),
            CONSTRAINT fk_szerzoID FOREIGN KEY (szerzoID) REFERENCES felhasznalok(id)
        )`)
}

export async function addCikkek(cikkCim, szerzoID, szoveg) {
    await client.query(`
        INSERT INTO cikkek(cikkID, cikkCim, cikkDatum, szerzoID, szoveg)
        VALUES (default, '${cikkCim}', NOW(), ${szerzoID}, '${szoveg}')
    `)
}

export async function getCikkek() {
    const cikkek = await client.query(`SELECT * FROM cikkek`)
    return cikkek.rows
 }

 export async function updateCikkek(cikkCim, cikkID) {
    const cikkek = await client.query(`
        UPDATE cikkek
        SET cikkCim = '${cikkCim}'
        WHERE cikkID = ${cikkID}
    `) 
}

export async function deleteCikkek(cikkID) {
    const cikkek = await client.query(`
        DELETE FROM cikkek
        WHERE cikkID = ${cikkID}
    `)
    return cikkek.rows
}