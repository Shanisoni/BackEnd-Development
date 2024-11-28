const express = require("express")
const router = express.Router();
const {handlwGetAllUser, getUserById} = require("../controllers/user");


router.get("/", handlwGetAllUser );

router
.route("/:id")
.get( getUserById )
.patch( async (req, res) => {
  
  await User.findByIdAndUpdate( req.params.id , {last_name : "Shanppppppi"} );
 
  return res.json( {status : "Success" , message : "User Updated"} );

  users[userIndex] = { ...users[userIndex], ...updatedData };

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to update user data" });
    }
    res.json({ status: "Success", user: users[userIndex] });
  });
})

.delete( async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success", message: "User deleted successfully" });
 


  users.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to delete user data" });
    }
    res.json({ status: "Success", message: "User deleted successfully" });
  });
});

// Add a new user
router.post("/", async (req, res) => {
  console.log("Adding a new user");
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

  return res.status(201).json({ status: "Success Ho gya " });

});

module.exports = router;


// Render list of users in HTML
// router.get("/users", async (req, res) => {
//     const allDbUsers = await User.find();
//     const html = `
//       <ul>
//           ${allDbUsers
//             .map(
//               (user) =>
//                 `<li>${user.first_name} ${user.last_name} ${user.email}</li>`
//             )
//             .join("")}
  
//       </ul>
      
//   `;
  
//     res.send(html);
//   });


  // Get all users

    // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err , data ) => {
  //   res.status(201).json({ status: "Success", id: users.length });
  //   if (err) {
  //     return res
  //       // .status(2001)
  //       .json({ status: "Error", message: "Failed to save user data" });
  //   }

  // });

  // router.use((req, res, next) => {
//   console.log("Middleware 1");
//   req.userName = "Shani.dev";
//   next(); // Continue to the next middleware
// });


// router.use((req, res, next) => {
//   console.log("Middleware 2", req.userName);
//   next(); // Continue to the next middleware or route handler
// });

// Routes

 // const id = Number(req.params.id);
  // const userIndex = users.findIndex((user) => user.id === id);
  // if (userIndex === -1) {
  //   return res.status(404).json({ error: "User not found" });
  // }

    // if (userIndex === -1) {
  //   return res.status(404).json({ error: "User not found" });
  // }
   // const id = Number(req.params.id);
  // const updatedData = req.body;
  // const userIndex = users.findIndex((user) => user.id === id);