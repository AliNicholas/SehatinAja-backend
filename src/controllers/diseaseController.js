const { app, admin, db } = require("../config/firebase");

async function addDieaseCategory() {
  try {
    const id = req.body.type;
    const data = {
      image: req.body.image,
    };

    const dieasesRef = db.collection("diseases").doc(id);
    const response = await dieasesRef.set(data);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
}

function getAllDieasesCategories() {}

function getDieaseCategoryById() {}

function updateDieaseCategoryById() {}

function deleteDieaseCategoryById() {}

async function addDisease() {
  try {
    const id = req.body.type;
    const data = {
      image: req.body.image,
    };

    const dieasesRef = db.collection("diseases").doc(id);
    const response = await dieasesRef.set(data);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
}

function getAllDiseases() {}

function getDiseaseDetailsById() {}

function updateDiseaseById() {}

function deleteDiseaseById() {}
