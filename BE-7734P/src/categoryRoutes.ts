import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const router = Router();
//Kategori oluşturma rotası (POST isteği)
router.post('/',CategoryController.createCategory);
//Id'ye göre kategori getirme rotası
router.get('/:id',CategoryController.getCategoryById)
//Kategori güncelleme rotası
router.put('/:id',CategoryController.updateCategory);
//Kategori yumuşak silme metodu
router.delete('/:id',CategoryController.softDeleteCategory);



export default router;