// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import categoryRoutes from "./routes/categoryRoutes"; // --> Düzeltme: './routes/categoryRoutes' olmalı. routes klasörünün içindeki categoryRoutes.ts'i import ediyor.
import knex from "../../knex"; // --> Düzeltme: './config/knex' olmalı. Config klasörünün içindeki knex.ts'i import ediyor.

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use(express.json()); // Alternatif ve modern Express kullanımı

// Rotaları uygulamaya dahil etme
// BURADAKİ YAZIM HATASI DÜZELTİLDİ: app.unsubscribe yerine app.use olacak!
app.use('/api/categories', categoryRoutes); // Tüm kategori rotaları '/api/categories' altında çalışacak

// Temel bir ana sayfa rotası (isteğe bağlı)
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Hata yakalama middleware'ini tüm rotalardan sonra ekle

// Sunucuyu başlatma
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API documentation: http://localhost:${port}/api-docs`); // Eğer Swagger/OpenAPI kurduysan

    try {
        await knex.raw('SELECT 1'); // Veritabanı bağlantısını test et
        console.log('Database connection successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
});