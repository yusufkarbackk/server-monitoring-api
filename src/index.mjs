import express from 'express';
import database from './db/db.mjs';
import { encrypt, decrypt } from './utils/security.mjs';
import { push, ref } from 'firebase/database';

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
    response.send("hello api")
})



app.post("/write", async (request, response) => {
    try {
        const { suhu, kelembaban, tegangan } = request.body
        const encryptedSuhu = encrypt(String(suhu))
        const encryptedKelembaban = encrypt(String(kelembaban))
        const encryptedTegangan = encrypt(String(tegangan))
        
        const db = database

        await push(ref(db, 'sensorData'), {
            suhu: encryptedSuhu,
            kelembaban: encryptedKelembaban,
            tegangan: encryptedTegangan
        })
        response.status(201).send({ msg: "data saved to firebase" })
    } catch (error) {
        console.log(`Error saving to direbase ${error}`)
        response.sendStatus(500).send({ error: "Internal server error" })
    }
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})