const { User } = require('../model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !password || !name) 
        return res.status(400).json({ 'message': 'Name, email, password are required.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isLength(password, {min: 5})) 
        return res.status(400).json({ 'message': 'Password must be at least 5 characters.'});
    if (!validator.isLength(name, {min: 1, max: 30})) 
        return res.status(400).json({ 'message': 'Name must be between 1 and 30 characters.'});
    if (!validator.isEmail(email)) 
        return res.status(400).json({ 'message': 'Email invalid.'});

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({where: { email: email }});
    if (duplicate) return res.status(409).json({ 'message': 'Email already taken.'}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new mobile
        const result = await User.create({
            name: name,
            password: hashedPwd,
            email: email
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) 
        return res.status(400).json({ 'message': 'Email, password are required.'});
    if (!validator.isAlphanumeric(password)) 
        return res.status(400).json({ 'message': 'Password invalid.'});
    if (!validator.isEmail(email)) 
        return res.status(400).json({ 'message': 'Email invalid.'});

    // check for duplicate usernames in the db
    const foundUser = await User.findOne({where: { email: email }});
    if (!foundUser) return res.status(401).json({ 'message': 'User not found.'}); 

    const match = await bcrypt.compare(password, foundUser.password)
    if(match) {
        try {

            // create JWTs
            const accessToken = jwt.sign(
                { "id": foundUser.id, },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { "id": foundUser.id, },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            );

            // cascading prev refreshTokens
            const refreshToken1 = foundUser.refreshToken
            const refreshToken2 = foundUser.refreshToken1
            foundUser.refreshToken2 = refreshToken2
            foundUser.refreshToken1 = refreshToken1
            // Saving refreshToken with founduser
            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 2 * 24 * 60 * 60 * 1000 });

            const authDetails = {
                name: foundUser.name,
                email: foundUser.email,
                id: foundUser.id,
                accessToken: accessToken
            }
            res.status(200).json(authDetails);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } else {
        return res.status(401).json({ 'message': 'Password incorrect.'});
    }    
}

const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "No cookie found" });
    const refreshToken = cookies.jwt;
    // console.log(refreshToken);

    let foundUser = null;
    foundUser = await User.findOne({where: { refreshToken: refreshToken }});
    if (!foundUser) {
        foundUser = await User.findOne({where: { refreshToken1: refreshToken }});
    }
    if (!foundUser) {
        foundUser = await User.findOne({where: { refreshToken2: refreshToken }});
    }
    if (!foundUser) return res.status(403).json({ message: "User not found"});
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.id !== decoded.id) return res.status(403).json({ message: "Refresh not allowed"});;
            const accessToken = jwt.sign(
                { "id": foundUser.id, },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            const authDetails = {
                name: foundUser.name,
                email: foundUser.email,
                id: foundUser.id,
                accessToken: accessToken
            }
            res.status(200).json(authDetails);
        }
    );
}

module.exports = { signup, login, refresh }