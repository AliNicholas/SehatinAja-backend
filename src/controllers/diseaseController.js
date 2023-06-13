const { db } = require("../config/firebase");

async function addDiseaseCategory(req, res) {
  try {
    const { categoryName } = req.body;

    const querySnapshot = await db
      .collection("diseaseCategories")
      .where("categoryName", "==", categoryName)
      .get();

    if (!querySnapshot.empty) {
      res
        .status(400)
        .json({ error: `'${categoryName}' category already exists.` });
    } else {
      const docRef = db.collection("diseaseCategories").doc();
      await docRef.set({
        categoryName: categoryName,
      });
      res.status(201).json({
        message: `'${categoryName}' category added successfully.`,
        id: docRef.id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDiseaseCategories(req, res) {
  try {
    const snapshot = await db.collection("diseaseCategories").get();
    const categories = [];
    snapshot.forEach((doc) => {
      const category = {
        id: doc.id,
        categoryName: doc.data().categoryName,
      };
      categories.push(category);
    });
    const result = { categories };
    res.status(200).json(result);
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
        categoryName: doc.data().categoryName,
      };
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: `Category not found.` });
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
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({ categoryName });
      res.status(200).json({
        message: `'${
          doc.data().categoryName
        }' category updated to '${categoryName}'.`,
      });
    } else {
      res.status(404).json({ error: `'${categoryName}' category not found.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function deleteDiseaseCategoryById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collection("diseaseCategories").doc(id);
    const doc = await docRef.get();
    await docRef.delete();
    res.status(200).json({
      message: `'${doc.data().categoryName}' category deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function addDisease(req, res) {
  try {
    const { categoryName, diseaseData } = req.body;

    const categorySnapshot = await db
      .collection("diseaseCategories")
      .where("categoryName", "==", categoryName)
      .get();

    if (categorySnapshot.empty) {
      res.status(404).json({ error: `'${categoryName}' category not found.` });
    } else {
      const categoryId = categorySnapshot.docs[0].id;

      const diseasesCollectionRef = db
        .collection("diseaseCategories")
        .doc(categoryId)
        .collection("diseases");

      const nameQuerySnapshot = await diseasesCollectionRef
        .where("name", "==", diseaseData.name)
        .get();

      if (!nameQuerySnapshot.empty) {
        res
          .status(400)
          .json({ error: `'${diseaseData.name}' already exists.` });
      } else {
        const docRef = diseasesCollectionRef.doc();

        await docRef.set(diseaseData);
        res.status(201).json({ message: "Disease added successfully." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDiseases(req, res) {
  try {
    const snapshot = await db.collectionGroup("diseases").get();
    const diseases = [];
    snapshot.forEach((doc) => {
      const disease = {
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
        caused: doc.data().caused,
        prevention: doc.data().prevention,
      };
      diseases.push(disease);
    });
    const result = { diseases };
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getDiseaseById(req, res) {
  try {
    const { categoryId, diseaseId } = req.params;
    const docRef = await db
      .collection("diseaseCategories")
      .doc(categoryId)
      .collection("diseases")
      .doc(diseaseId)
      .get();

    if (docRef.exists) {
      const disease = {
        name: docRef.data().name,
        message: docRef.data().message,
        caused: docRef.data().caused,
        prevention: docRef.data().prevention,
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
    const { categoryId, diseaseId } = req.params;
    const { diseaseData } = req.body;
    const docRef = db
      .collection("diseaseCategories")
      .doc(categoryId)
      .collection("diseases")
      .doc(diseaseId);

    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.update(diseaseData);
      res.status(200).json({ message: "Disease updated successfully." });
    } else {
      res.status(404).json({ error: "Disease not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function deleteDiseaseById(req, res) {
  try {
    const { categoryId, diseaseId } = req.params;
    const docRef = db
      .collection("diseaseCategories")
      .doc(categoryId)
      .collection("diseases")
      .doc(diseaseId);

    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.delete();
      res.status(200).json({ message: "Disease deleted successfully." });
    } else {
      res.status(404).json({ error: "Disease not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDiseasesInCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const categoryRef = db.collection("diseaseCategories").doc(categoryId);
    const categorySnapshot = await categoryRef.get();

    if (!categorySnapshot.exists) {
      return res.status(404).json({ error: "Category not found." });
    }

    const categoryName = categorySnapshot.data().categoryName;

    const snapshot = await categoryRef.collection("diseases").get();
    const diseases = [];
    snapshot.forEach((doc) => {
      const disease = {
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
        caused: doc.data().caused,
        prevention: doc.data().prevention,
      };
      diseases.push(disease);
    });
    const result = {
      categoryName: categoryName,
      diseases: diseases,
    };
    res.status(200).json(result);
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
