const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;

// Load mock user data
const users = require("./MOCK_DATA.json");

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
app.get("/api/users2", (req, res) => {
  console.log("Fetching users", req.userName);
  console.log("Fetching users2", req.headers);
  res.setHeader("Content-Type2", "Shani");
  res.json(users);
});

// Add a new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to save user data" });
    }
    res.json({ status: "Success", id: users.length });
  });
});

// Get, update, or delete a user by ID
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
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
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users
              .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
              .join("")}
        </ul>
    `;
  res.send(html);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
