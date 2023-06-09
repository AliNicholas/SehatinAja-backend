const express = require("express");
const router = express.Router();
const {
  addDiseaseCategory,
  getAllDiseaseCategories,
  getAllDiseasesInCategory,
  getDiseaseCategoryById,
  updateDiseaseCategoryById,
  deleteDiseaseCategoryById,
  addDisease,
  getAllDiseases,
  getDiseaseById,
  updateDiseaseById,
  deleteDiseaseById,
} = require("../controllers/diseaseController");

router.post("/disease-categories", addDiseaseCategory);
router.get("/disease-categories", getAllDiseaseCategories);
router.get("/disease-categories/:id", getDiseaseCategoryById);
router.put("/disease-categories/:id", updateDiseaseCategoryById);
router.delete("/disease-categories/:id", deleteDiseaseCategoryById);
router.get("/disease-categories/:id/diseases", getAllDiseasesInCategory);
router.post("/diseases", addDisease);
router.get("/diseases", getAllDiseases);
router.get("/diseases/:id", getDiseaseById);
router.delete("/diseases/:id", updateDiseaseById);
router.put("/diseases/:id", deleteDiseaseById);

module.exports = router;
