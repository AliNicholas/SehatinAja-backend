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
router.post("/diseases", addDisease);
router.get("/diseases", getAllDiseases);
router.get("/diseases/:categoryId/:diseaseId", getDiseaseById);
router.put("/diseases/:categoryId/:diseaseId", updateDiseaseById);
router.delete("/diseases/:categoryId/:diseaseId", deleteDiseaseById);
router.get("/diseases/:categoryId", getAllDiseasesInCategory);

module.exports = router;
