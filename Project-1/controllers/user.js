const User = require('../models/user');

async function handlwGetAllUser( req , res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
    
}

async function getUserById( req , res , next) {

    const user = await User.findById(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
    
}

module.exports = {
    handlwGetAllUser,
    getUserById,
}