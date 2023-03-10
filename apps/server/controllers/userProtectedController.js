const { User } = require('../model');

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    let foundUser = null;
    foundUser = await User.findOne({where: { refreshToken: refreshToken }});
    if (!foundUser) await User.findOne({where: { refreshToken1: refreshToken }});
    if (!foundUser) await User.findOne({where: { refreshToken2: refreshToken }});
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    await foundUser.save();
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { logout }