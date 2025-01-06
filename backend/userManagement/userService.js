const { log } = require('console')
const {db} = require('../dbconfig/dbInit')
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email, password } = req.body
    const newUser = {
        email: email,
        password: password,
        role: ""
    }
    try {
        if(! await isEmailUsed(email)){
            if (email.endsWith('@pet.com')) {
                newUser.role = 'admin';
            } else {
                newUser.role = 'user';
            }

            const addedUser = await db.collection('users').add(newUser)

            const userDoc = await addedUser.get()
            const userData = userDoc.data()

            console.log('New user ID:', addedUser.id)
            console.log('New user data:', userData)

            const token = jwt.sign(
                { email: email},
                'alex',
                { expiresIn: '24h' }
            );
    
            res.cookie('jwtToken', token, {
                httpOnly: true,
            });

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
        password: password,
        role: ""
    }

    let auth = false

    const querySnapshot = await db.collection('users').where('email', '==', userToAuthenticate.email).limit(1).get();

    querySnapshot.forEach(element => {
        console.log('A user matching the email address has been found.')
        const userData = element.data()

        if (userData.password === userToAuthenticate.password){
             auth = true;
             userToAuthenticate.role = userData.role;
        }
    });

    if (auth) {

        const token = jwt.sign(
            { email: email},
            'alex',
            { expiresIn: '24h' }
        );

        res.cookie('jwtToken', token, {
            httpOnly: true,
        });
        console.log(userToAuthenticate);
        res.status(200).send({ email: email,role: userToAuthenticate.role})
    } else {
        res.status(401).send({ email: email,role: userToAuthenticate.role})
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

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwtToken', {
            httpOnly: true, 
            sameSite: 'strict', 
        });
        res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send({ message: 'An error occurred during logout' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser
}