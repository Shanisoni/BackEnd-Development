const User = require('../models/user');

async function handlwGetAllUser( req , res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
    
}