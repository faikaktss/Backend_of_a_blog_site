// knexfile.ts
import type { Knex } from "knex"; // Bu satırın olduğundan emin ol

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'your_username', // Kendi kullanıcı adın olmalı
      password: process.env.DB_PASSWORD || 'your_password', // Kendi şifren olmalı
      database: process.env.DB_NAME || 'blog_db',
    },
    migrations: {
      directory: './db/migrations', // BURAYA ÇOK DİKKAT ET! Tırnaklar, nokta, slash ve klasör isimleri doğru mu?
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds', // Burası da doğru olmalı, olmasa bile boş kalabilir
    },
  },
  // Eğer başka ortamlar varsa (staging, production) onlar da burada olmalı.
  // Yoksa sadece development kısmı kalabilir.
};

export default config; // Bu satırın en sonda olduğundan emin ol