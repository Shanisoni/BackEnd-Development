const User = require('../models/user');


async function handlwGetAllUser( req , res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
    
}

async function handlegetUserById( req , res , next) {

    const user = await User.findById(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
    
}



async function handleUpdateUserById( req , res , next){
    await User.findByIdAndUpdate( req.params.id , {last_name : "Shanppppppi"} ); 
    return res.json( {status : "Success" , message : "User Updated"} );
}



async function handleDeleteUserById( req , res , next){
    await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success", message: "User deleted successfully" });
}



async function handleCreateUserById( req , res , next){
    try {
        const { first_name, last_name, email, JobTitle, Gender } = req.body;
        console.log(first_name, last_name, email, JobTitle, Gender);
        const result = await User.create({
          first_name,
          last_name,
          email,
          JobTitle,
          Gender,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "Error", message: error });
      }
    
      return res.status(201).json({ status: "Success Ho gya "  , id : result._id});
}

module.exports = {
    handlwGetAllUser,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById,
}