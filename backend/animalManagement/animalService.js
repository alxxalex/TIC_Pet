const db = require('../dbconfig/dbInit');


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

module.exports = {
  getAnimals,
  addAnimal,
};
