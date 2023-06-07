const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("C:/Users/LENOVO/Downloads/basic-web-28a1a-firebase-adminsdk-wfxmm-ac0f738fbc.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// ambil kategori dokter ///
app.get("/doctors", (req, res) => {
  console.log("");
});

// diseases
//mengirim data type of diseases
app.post("/diseases", async (req, res) => {
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
});

// mengirim data disease ke tiap tiap type of diseases
app.post("/diseases/:type", async (req, res) => {
  const documentId = req.params.type;
  const id = req.body.name;
  const diseaseJson = {
    description: req.body.desc,
    image: req.body.image,
  };

  try {
    const diseasesRef = db.collection("diseases").doc(documentId);

    const response = await diseasesRef
      .collection("disease")
      .doc(id)
      .add(diseaseJson);

    res.send(response);
    res.json({ message: "Penyakit berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan penyakit: ", error);
    res.status(500).json({ error: "Gagal menambahkan penyakit" });
  }
});

// app.get("/diseases/:documentId", async (req, res) => {
//   const documentId = req.params.documentId;

//   try {
//     const documentSnapshot = await db
//       .collection("diseases")
//       .doc(documentId)
//       .get();
//     const diseaseCollectionSnapshot = await documentSnapshot.ref
//       .collection("disease")
//       .get();

//     const diseases = [];
//     diseaseCollectionSnapshot.forEach((doc) => {
//       diseases.push({ id: doc.id, name: doc.data().name });
//     });

//     res.json(diseases);
//   } catch (error) {
//     console.error("Gagal mendapatkan penyakit: ", error);
//     res.status(500).json({ error: "Gagal mendapatkan penyakit" });
//   }
// });

const PORT = 8080;
app.listen($PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
