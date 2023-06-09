const { app, admin, db } = require("../config/firebase");

async function addDiseaseCategory() {
  try {
    const { categoryName } = req.body;
    const docRef = db.collection("diseaseCategories").doc(categoryName);
    await docRef.set({});
    res.status(200).json({ message: "Disease category added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDiseaseCategories() {
  try {
    const snapshot = await db.collection("diseaseCategories").get();
    const categories = [];
    snapshot.forEach((doc) => {
      const category = {
        id: doc.id,
        categoryName: doc.id,
      };
      categories.push(category);
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getDiseaseCategoryById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collection("diseaseCategories").doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      const category = {
        id: doc.id,
        categoryName: doc.id,
      };
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Disease category not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function updateDiseaseCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const docRef = db.collection("diseaseCategories").doc(id);
    await docRef.update({ categoryName });
    res.status(200).json({ message: "Disease category updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function deleteDiseaseCategoryById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collection("diseaseCategories").doc(id);
    await docRef.delete();
    res.status(200).json({ message: "Disease category deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDiseasesInCategory(req, res) {
  try {
    const { id } = req.params;
    const snapshot = await db
      .collection("diseaseCategories")
      .doc(id)
      .collection("diseases")
      .get();
    const diseases = [];
    snapshot.forEach((doc) => {
      const disease = {
        id: doc.id,
        ...doc.data(),
      };
      diseases.push(disease);
    });
    res.status(200).json(diseases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function addDisease(res, res) {
  try {
    const { categoryId, diseaseData } = req.body;
    const docRef = db
      .collection("diseaseCategories")
      .doc(categoryId)
      .collection("diseases")
      .doc();
    await docRef.set(diseaseData);
    res.status(200).json({ message: "Disease added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDiseases() {
  try {
    const snapshot = await db.collectionGroup("diseases").get();
    const diseases = [];
    snapshot.forEach((doc) => {
      const disease = {
        id: doc.id,
        ...doc.data(),
      };
      diseases.push(disease);
    });
    res.status(200).json(diseases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getDiseaseById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collectionGroup("diseases").doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      const disease = {
        id: doc.id,
        ...doc.data(),
      };
      res.status(200).json(disease);
    } else {
      res.status(404).json({ error: "Disease not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function updateDiseaseById(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const docRef = db.collectionGroup("diseases").doc(id);
    await docRef.update(updatedData);
    res.status(200).json({ message: "Disease updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function deleteDiseaseById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collectionGroup("diseases").doc(id);
    await docRef.delete();
    res.status(200).json({ message: "Disease deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

module.exports = {
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
};
