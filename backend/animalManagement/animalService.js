const {db,storage} = require('../dbconfig/dbInit');
const { v4: uuidv4 } = require("uuid");

const getAnimals = async (req, res) => {
  try {
    const animalsCollection = db.collection('animals'); 
    const snapshot = await animalsCollection.get(); 

    const animals = [];
    snapshot.forEach(doc => {
      animals.push({ id: doc.id, ...doc.data() }); 
    });

    return res.status(200).json(animals); 
  } catch (error) {
    console.error('Error fetching animals:', error);
    return res.status(500).json({ error: 'Failed to fetch animals' });
  }
};


const addAnimal = async (req, res) => {
  try {
    const { name, type, image, description } = req.body;

    if (!name || !type || !image || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const animalsCollection = db.collection('animals');

    const newAnimal = {
      name,
      type,
      image,
      description,
      createdAt: new Date().toISOString(), 
    };

    const docRef = await animalsCollection.add(newAnimal);

    return res.status(201).json({ id: docRef.id, ...newAnimal });
  } catch (error) {
    console.error("Error adding animal:", error);
    return res.status(500).json({ message: "An error occurred while adding the animal." });
  }
};

const uploadAnimalImage = async (req, res) => {
    const file = req.file; 
  
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
  
    try {
      const fileName = `images/${uuidv4()}-${file.originalname}`;
      const fileRef = storage.file(fileName);
  
      await fileRef.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });
  
      const expiresInDays = 7;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expiresInDays);
  
      const [url] = await fileRef.getSignedUrl({
        action: "read",
        expires: expirationDate.toISOString(),
      });
  
      return res.status(200).json({ imageUrl: url });
    } catch (error) {
      console.error("Error uploading image:", error);
      return res.status(500).json({ message: "Error uploading image." });
    }
  };

  const deleteAnimal = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: "Animal ID is required." });
    }
  
    try {
      const animalsCollection = db.collection('animals');
      const docRef = animalsCollection.doc(id);
  
      const doc = await docRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: "Animal not found." });
      }
  
      await docRef.delete();
      return res.status(200).json({ message: "Animal deleted successfully." });
    } catch (error) {
      console.error("Error deleting animal:", error);
      return res.status(500).json({ message: "An error occurred while deleting the animal." });
    }
  };

  const getAnimalById = async (req, res) => {
    const { id } = req.params; 
    try {
        const animalRef = db.collection('animals').doc(id);
        const animalDoc = await animalRef.get();

        if (!animalDoc.exists) {
            return res.status(404).send({ error: "Animal not found" });
        }

        const animalData = animalDoc.data();
        return res.status(200).json({ id: animalDoc.id, ...animalData });
    } catch (error) {
        console.error("Error fetching animal:", error);
        res.status(500).send({ error: "An error occurred while fetching the animal" });
    }
};

const updateAnimal = async (req, res) => {
  try {
    const { id, name, type, image, description } = req.body;

    if (!id || !name || !type || !image || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const animalsCollection = db.collection('animals');

    const docRef = animalsCollection.doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).json({ message: "Animal not found." });
    }

    const updatedAnimal = {
      name,
      type,
      image,
      description,
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(updatedAnimal);

    return res.status(200).json({ id, ...updatedAnimal });
  } catch (error) {
    console.error("Error updating animal:", error);
    return res.status(500).json({ message: "An error occurred while updating the animal." });
  }
};


module.exports = {
  getAnimals,
  addAnimal,
  uploadAnimalImage,
  deleteAnimal,
  getAnimalById,
  updateAnimal
};
