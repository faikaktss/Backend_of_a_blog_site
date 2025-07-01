import knex from '../../knex';
//Kategori verilerinin tiplerini tanımlıyoruz(typescript için)
interface Category{
    id?: number;//Id'si otomatik artan olduğu için opisyonel
    name:string;
    created_at:Date;
    updated_at:Date;
    deleted_at:Date;
}

class CategoryModel{
    private tableName = 'categories'; //Çalışacağımız tablo adı
    //Yeni kategori oluşturma 
    async create(category: Omit<Category, 'id' |'created_at' | 'updated_at'|'deleted_at'>):Promise<Category>{
    /*Omit = "Bana sadece name özelliği olan bir Category objesi gelecek, diğerlerini bekleme" */    
        const [newCategory] = await knex(this.tableName).insert(category).returning('*');
        return newCategory;
    }

    //Tüm kategorileri listeleme
    async findAll():Promise<Category[]>{
        return knex(this.tableName).select('*').whereNull('deleted_at');
    }
    //Id'ye göre kategori bulma
    async findById(id:number):Promise<Category | undefined>{
        return knex(this.tableName).select('*').where({id, deleted_at:null}).first();
    }
    //Kategori güncelleme
    async update(id:number, updates:Partial<Category>):Promise<Category | undefined>{
        //Partial category tipindeki tüm alanları opsiyonel yapar sadece güncellenecek kısmı döndürür
        const [updatedCategory] = await knex(this.tableName).where({id,deleted_at:null}).update(updates).returning('*');
        return updatedCategory;
    //Kategori silme
    }
    async softDelete(id:number):Promise<boolean>{
        const affectedRows = await knex(this.tableName).where({id,deleted_at:null}).update({deleted_at:knex.fn.now()});
        return affectedRows >0;
    }
    //Kategori silme
    async hardDelete(id:number):Promise<boolean>{
        const affectedRowss = await knex(this.tableName).where({id}).del();
        return affectedRowss > 0;
        
    }   
}
export default new CategoryModel();