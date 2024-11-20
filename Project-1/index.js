const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    JobTitle: {
      type: String,
    },
    Gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Shani-app1")
  .then(() => console.log(" MongoDB Connected "))
  .catch((error) => console.log(" MonoDB Error", error));

// Load mock user data
// const users = require("./MOCK_DATA.json");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // This is important for parsing JSON bodies

// Custom Middleware
app.use((req, res, next) => {
  console.log("Middleware 1");
  req.userName = "Shani.dev";
  next(); // Continue to the next middleware
});

app.use((req, res, next) => {
  // Log request details to a file
  fs.appendFile(
    "Logs.txt",
    `\n${Date.now()} ${req.ip}: ${req.method} : ${req.path}\n`,
    (err) => {
      if (err) {
        console.error("Error saving logs:", err);
      } else {
        console.log("Logs are saved");
      }
    }
  );
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2", req.userName);
  next(); // Continue to the next middleware or route handler
});

// Routes

// Get all users
app.get("/api/users", async (req, res) => {

  console.log("Fetching users", req.userName);

  console.log("Fetching users2", req.headers);

  res.setHeader("Content-Type2", "Shani");
 
  const allDbUsers = await User.find();
  return res.json(allDbUsers);

});

// Add a new user
app.post("/api/users", async (req, res) => {
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
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err , data ) => {
  //   res.status(201).json({ status: "Success", id: users.length });
  //   if (err) {
  //     return res
  //       // .status(2001)
  //       .json({ status: "Error", message: "Failed to save user data" });
  //   }

  // });
});

// Get, update, or delete a user by ID
app
  .route("/api/users/:id")
  .get( async (req, res) => {
    // const id = Number(req.params.id);
     const user = await User.findById(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  })

  .patch( async (req, res) => {
    await User.findByIdAndUpdate
    // const id = Number(req.params.id);
    const updatedData = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
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

  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
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

// Render list of users in HTML
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find();
  const html = `
    <ul>
        ${allDbUsers
          .map(
            (user) =>
              `<li>${user.first_name} ${user.last_name} ${user.email}</li>`
          )
          .join("")}
    </ul>
`;

  res.send(html);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
