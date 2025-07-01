// knexfile.js
const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'blog_db',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
      extension: 'js', // <-- BU SATIR ÇOK ÖNEMLİ! ARTIK JS UZANTILI MIGRATION OLUŞTURULACAK
    },
    seeds: {
      directory: './db/seeds',
      extension: 'js', // <-- Buraya da ekleyebiliriz, ilerisi için iyi olur
    },
  },
  // ... diğer ortamlar (staging, production) burada olabilir
};

module.exports = config; // <-- Bu satırın en sonda olduğundan emin ol