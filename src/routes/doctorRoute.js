const express = require("express");
const router = express.Router();
const {
  addDoctorCategory,
  getAllDoctorCategories,
  getDoctorCategoryById,
  updateDoctorCategoryById,
  deleteDoctorCategoryById,
  getAllDoctorsInCategory,
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
} = require("../controllers/doctorController");

router.post("/doctor-categories", addDoctorCategory);
router.get("/doctor-categories", getAllDoctorCategories);
router.get("/doctor-categories/:id", getDoctorCategoryById);
router.put("/doctor-categories/:id", updateDoctorCategoryById);
router.delete("/doctor-categories/:id", deleteDoctorCategoryById);
router.post("/doctors", addDoctor);
router.get("/doctors", getAllDoctors);
router.get("/doctors/:categoryId/:doctorId", getDoctorById);
router.put("/doctors/:categoryId/:doctorId", updateDoctorById);
router.delete("/doctors/:categoryId/:doctorId", deleteDoctorById);
router.get("/doctors/:categoryId", getAllDoctorsInCategory);

module.exports = router;
