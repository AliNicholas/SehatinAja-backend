const { app, admin, db } = require("../config/firebase");

async function addDoctorCategory(req, res) {
  try {
    const { categoryName } = req.body;

    const querySnapshot = await db
      .collection("doctorCategories")
      .where("categoryName", "==", categoryName)
      .get();

    if (!querySnapshot.empty) {
      res
        .status(400)
        .json({ error: `'${categoryName}' category already exists.` });
    } else {
      const docRef = db.collection("doctorCategories").doc();
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

async function getAllDoctorCategories(req, res) {
  try {
    const snapshot = await db.collection("doctorCategories").get();
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

async function getDoctorCategoryById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collection("doctorCategories").doc(id);
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

async function updateDoctorCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const docRef = db.collection("doctorCategories").doc(id);
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

async function deleteDoctorCategoryById(req, res) {
  try {
    const { id } = req.params;
    const docRef = db.collection("doctorCategories").doc(id);
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

async function addDoctor(req, res) {
  try {
    const { categoryName, doctorData } = req.body;

    const categorySnapshot = await db
      .collection("doctorCategories")
      .where("categoryName", "==", categoryName)
      .get();

    if (categorySnapshot.empty) {
      res.status(404).json({ error: `'${categoryName}' category not found.` });
    } else {
      const categoryId = categorySnapshot.docs[0].id;

      const doctorsCollectionRef = db
        .collection("doctorCategories")
        .doc(categoryId)
        .collection("doctors");

      const nameQuerySnapshot = await doctorsCollectionRef
        .where("name", "==", doctorData.name)
        .get();

      if (!nameQuerySnapshot.empty) {
        res.status(400).json({ error: `'${doctorData.name}' already exists.` });
      } else {
        const docRef = doctorsCollectionRef.doc();

        await docRef.set(doctorData);
        res.status(201).json({ message: "Doctor added successfully." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDoctors(req, res) {
  try {
    const snapshot = await db.collectionGroup("doctors").get();
    const doctors = [];
    snapshot.forEach((doc) => {
      const doctor = {
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
        caused: doc.data().caused,
        prevention: doc.data().prevention,
      };
      doctors.push(doctor);
    });
    const result = { doctors };
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getDoctorById(req, res) {
  try {
    const { categoryId, doctorId } = req.params;
    const docRef = await db
      .collection("doctorCategories")
      .doc(categoryId)
      .collection("doctors")
      .doc(doctorId)
      .get();

    if (docRef.exists) {
      const doctor = {
        name: docRef.data().name,
        message: docRef.data().message,
        caused: docRef.data().caused,
        prevention: docRef.data().prevention,
      };
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ error: "Doctor not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function updateDoctorById(req, res) {
  try {
    const { categoryId, doctorId } = req.params;
    const { doctorData } = req.body;
    const docRef = db
      .collection("doctorCategories")
      .doc(categoryId)
      .collection("doctors")
      .doc(doctorId);

    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.update(doctorData);
      res.status(200).json({ message: "Doctor updated successfully." });
    } else {
      res.status(404).json({ error: "Doctor not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function deleteDoctorById(req, res) {
  try {
    const { categoryId, doctorId } = req.params;
    const docRef = db
      .collection("doctorCategories")
      .doc(categoryId)
      .collection("doctors")
      .doc(doctorId);

    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.delete();
      res.status(200).json({ message: "Doctor deleted successfully." });
    } else {
      res.status(404).json({ error: "Doctor not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function getAllDoctorsInCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const categoryRef = db.collection("doctorCategories").doc(categoryId);
    const categorySnapshot = await categoryRef.get();

    if (!categorySnapshot.exists) {
      return res.status(404).json({ error: "Category not found." });
    }

    const categoryName = categorySnapshot.data().categoryName;

    const snapshot = await categoryRef.collection("doctors").get();
    const doctors = [];
    snapshot.forEach((doc) => {
      const doctor = {
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
        caused: doc.data().caused,
        prevention: doc.data().prevention,
      };
      doctors.push(doctor);
    });
    const result = {
      categoryName: categoryName,
      doctors: doctors,
    };
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

module.exports = {
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
};
