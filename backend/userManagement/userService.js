const { log } = require('console')
const db = require('../dbconfig/dbInit')

const getAllUsers = (req, res) => {
    res.send(db.collection("users").get())
} 

const registerUser = async (req, res) => {
    const { email, password } = req.body
    const newUser = {
        email: email,
        password: password
    }
    try {
        console.log('aa');
        console.log(isEmailUsed(email));

        if(! await isEmailUsed(email)){
            const addedUser = await db.collection('users').add(newUser)

            const userDoc = await addedUser.get()
            const userData = userDoc.data()

            console.log('New user ID:', addedUser.id)
            console.log('New user data:', userData)

            res.status(201).json({
                id: addedUser.id,
                ...userData
            })
        }else{
            res.status(400).send({
                errors: [{ msg: "Email is already used"}]
            });
        }
    } catch(error) {
        res.status(500).send(JSON.stringify(error))
    }

} 

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const userToAuthenticate = {
        email: email,
        password: password
    }

    let auth = false

    const querySnapshot = await db.collection('users').where('email', '==', userToAuthenticate.email).limit(1).get();

    querySnapshot.forEach(element => {
        console.log('A user matching the email address has been found.')
        const userData = element.data()

        if (userData.password === userToAuthenticate.password) auth = true
    });

    if (auth) {
        res.status(200).send({ email: email})
    } else {
        res.status(401).send({ email: email})
    }
}

const isEmailUsed = async (email) => {
    try {
      const usersRef = db.collection('users');
      const querySnapshot = await usersRef.where('email', '==', email).limit(1).get();

      return !querySnapshot.empty
      
    } catch (error) {
      console.error("Error checking email:", error);
      throw error; 
    }
    
  }

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
}