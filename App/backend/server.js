const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 65003;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
// app.use("/api/people", require("./routes/peopleRoutes"));


// Add your Connect DB Activitiy Code Below:
// ...
const db = require('./database/config.js')

app.get('/classes',  (req, res) => {
    let query_classes = 'SELECT * FROM Classes;'
    db.pool.query(query_classes, (err, result)=>{
      if (err) throw err;
      res.json(result)
    });
});

// ...
// End Connect DB Activity Code.


app.listen(PORT, () => {
  // Change this text to whatever FLIP server you're on
  console.log(`Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`);
});
