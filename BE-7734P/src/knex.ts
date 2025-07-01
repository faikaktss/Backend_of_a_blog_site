// src/config/knex.ts
require('dotenv').config({path:'./.env'});
import Knex from 'knex';//knex kütüphanesini import ediyoruz
import knexConfig from './BE-7734P/src/knexfilee'; // knexfile.js dosyamızı import ediyoruz

// Knex konfigürasyonundan development ortamını seçiyoruz
const knex = Knex(knexConfig.development);

export default knex;//diğer dosyalarda kullanabilmek için dışa aktarıyoruz