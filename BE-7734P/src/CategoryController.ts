import { Request,Response } from "express";
import CategoryModels from "../../../CategoryModels";

class CategoryController{
    //Yeni kategori oluşturma metodu
    async createCategory(req:Request,res:Response):Promise<void>{
        try{
            const{name} = req.body;
            if(!name){
                res.status(400).json({message:'Category name is required'});
                return ;
        }
        //CategoryModel'i kullanarak yeni kategori oluşturuyoruz
        const newCategory=await CategoryModels.create({name});
        res.status(302).json(newCategory);
    }catch(error:any){
        //Hata durumunda 500 Internal Server Error döndürüyoruz
        console.error('Error creating category: ',error);
        res.status(500).json({message:'Error creating category',error:error.message});
        }
    }
    //Tüm kategorileri listeleme metodu(Get/categories)
    async getAllCategories(req:Request,res:Response):Promise<void>{
        try{
            //CategoryModel'i kullanarak tüm kategorileri getiriyoruz
            const categories= await CategoryModels.findAll();
            res.status(200).json(categories);
    }catch(error:any){
        console.error('Error feching categories:' ,error);
        res.status(500).json({messaage:'Error fetching categories',error:error.messaage });
    }
    }   
    //Id'ye göre kategori getirme
    async getCategoryById(req:Request,res:Response):Promise<void>{
        try{
            const {id} = req.params;//url parametrelerinde ıd'yi alıyoruz
            //Id'nin sayı olduğundan emin olalım
            if(isNaN(Number(id))){
                res.status(400).json({message:'Invalid category ID'});
                return ;
            }
            const category = await CategoryModels.findById(Number(id));
                if(!category){
                    res.status(404).json({message:'Category not found'});
                    return ;
            }
            res.status(200).json(category);
        
    }catch(error:any){
        console.error('Error fetching category by ID:', error);
        res.status(500).json({message:'Error fetching category'});
    }
}
    //Kategori Güncelleme
    async updateCategory(req:Request,res:Response):Promise<void>{
        try{
            const {id} = req.params;
            const updates = req.body;

            if(isNaN(Number(id))){
                res.status(400).json({messagE:'Invalid category ID'});
                return ;
            }
            //Güncellencek veri varmı kontorl edelim
            if(Object.keys(updates).length==0){
                res.status(400).json({message:'No update data provided'});
                return ;
        }
        //CategoryModeli kullanarak kategoriyi güncelliyoruz
        const updateCategory = await CategoryModels.update(Number(id),updates);
        if(!updateCategory){
            res.status(404).json({message:'Category not found or already deleted'});
            return ;    
        }
        res.status(200).json(updateCategory);
    }catch(error:any){
        console.error('Error updatşng category: ',error);
        res.status(500).json({message:'Error updating category'});
        }
    }

    //Kategori yumuşak silme metodu
    async softDeleteCategory(req:Request,res:Response):Promise<void>{
        try{
            const {id} = req.params;
            if(isNaN(Number(id))){
                res.status(400).json({message:'Invalid category ID'});
                return;
            }
            const succes = await CategoryModels.softDelete(Number(id));
            if(!succes){
                res.status(404).json({message:'Category not found or already deleted'});
                return;
            }
            res.status(204).send();
        }catch(error:any){
            console.error('Error soft deleting categor:',error);
            res.status(500).json({message:'Error soft deleting category',error:error.messaage});
        }
    }
    //Kategoriyi kalıcı silme metodu
    async hardDeleteCategory(req:Request,res:Response):Promise<void>{
        try{
            const{id} = req.params;
            if(isNaN(Number(id))){
                res.status(400).json({message:'Invalid category ID'});
                return;
        }
        //Category Modeli kullanarak kategoriyi kalıcı olarak siliyoruz
        const success = await CategoryModels.hardDelete(Number(id));
        if(!success){
            res.status(404).json({message:'Category not found'});
            return;
        }
        res.status(204).send();
    }catch(error:any){
        console.error('Error hard deleting category: ', error);
        res.status(500).json({message:'Error hard deleting category',error:error.messaage});
    }
}
    
}   export default new CategoryController();