/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  /*Bu satır javascripte bir modülü dışa aktarmanın bir yoludur
    Knex migration sistemi bu 'up' fonksiyonunu arar ve onu çalıştırır
    knex objesi veri tabanı üzerinde işlem yapmamızı sağlayan knex kütüphanesinin ana objesidir
    veri tabanaı bağlantı bilgilerimiz bu knex objesi aracılığıyla kullanılır
    */

    //posts adında yeni bir tablo oluşturuyoruz
    return knex.schema.createTable('posts',(table)=>{
    /*knex.schmea: knex'in veritabanı şemasını yönetme yeteneklerini içeren kısımdır
    */
    table.increments('id').primary();
    /*Bu satır id adında bir sütun oluşturur*/
    table.string('title').notNullable();
    //Bu satır title adında bir sütun oluşturur.sütuna girilecek şeyler string olmalı ve içi boş olmamalı
    table.text('content').notNullable();
    
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL').nullable();
    /*Bu caegoryid sütunundaki değerin negatif olamayacağını belirtir*/ 

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
