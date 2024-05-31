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

//Get one class
app.get('/classes/:_id', (req, res) => {
    const class_id = req.params._id
    let query_class = `SELECT class_id, name, duration, capacity, description FROM Classes WHERE class_id = ${class_id};`
    db.pool.query(query_class, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

//Get all classes
app.get('/classes', (req, res) => {
    let query_classes = 'SELECT * FROM Classes;'
    db.pool.query(query_classes, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});


app.post('/classes', (req, res) => {
    //CREATE A CLASS
    const { name, duration, capacity, description } = req.body;
    if (!name || !duration || !capacity || !description) {
        return res.status(400);
    }
    let query_create_class = `INSERT INTO Classes (name, duration, capacity, description) VALUES ('${name}', '${duration}', '${capacity}', '${description}');`
    db.pool.query(query_create_class, [name, duration, capacity, description], (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

app.put('/classes/:_id', (req, res) => {
    //UPDATE A CLASS
    const class_id = parseInt(req.params._id);
    const { name, duration, capacity, description } = req.body;

    let query_update_class = `UPDATE Classes SET 
        name='${name}',
        duration = '${duration}',
        capacity='${capacity}',
        description = '${description}'   
        WHERE class_id= ${class_id};`
    db.pool.query(query_update_class, [name, duration, capacity, description], (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});


app.delete('/classes/:_id', (req, res) => {
    //DELETE A CLASS
    const class_id = req.params._id;
    let query_delete_class = `DELETE FROM Classes WHERE class_id = ${class_id};`
    db.pool.query(query_delete_class, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

//Get all instructors
app.get('/instructors', (req, res) => {
    let inst_get_query = 'SELECT * FROM Instructors;'
    db.pool.query(inst_get_query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
//Create one instructor
app.post('/instructors', (req, res) => {
    const { first_name, last_name, preferred_name, email, phone_number } = req.body;
    let inst_post_query = `INSERT INTO Instructors (first_name, last_name, preferred_name, email, phone_number)
    VALUES ('${first_name}', '${last_name}', '${preferred_name}', '${email}', '${phone_number}');`
    db.pool.query(inst_post_query, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

//Add classes for one instructor
app.post('/instructors/:_id/classes', async(req, res) => {
    const inst_id = req.params._id;
    const class_ids = req.body.class_ids;
    const class_ids_w_inst= await class_ids.map((class_id, i) => {
        return {_id:class_id, inst_id}
    })
    let responses = await Promise.all(
        class_ids_w_inst.map(async(one_class, i)=>{
            let inst_add_class_query = `INSERT INTO Instructors_has_Classes (instructor_id, class_id)
            VALUES('${one_class.inst_id}', '${one_class._id}');`
            db.pool.query(inst_add_class_query, (err, result) => {
                if (err) throw err;
                return result
            });
             
        })
    )
    res.json(responses)
});

//Get one instructor
app.get('/instructors/:_id', (req, res) => {
    const inst_id = req.params._id;
    let get_inst_query = `SELECT instructor_id, first_name, last_name, preferred_name, email, phone_number
    FROM Instructors
    WHERE instructor_id = ${inst_id};`
    db.pool.query(get_inst_query, (err, result) => {
        if (err) throw (err);
        res.json(result);
    })
});

//Get one instructor's classes
app.get('/instructors/:_id/classes', (req, res) => {
    const inst_id = req.params._id;
    let get_inst_classes_query = `SELECT Instructors_has_Classes.class_id, Classes.name AS class_name, Instructors_has_Classes.instructor_id
    FROM Instructors JOIN Instructors_has_Classes ON Instructors.instructor_id = Instructors_has_Classes.instructor_id
    JOIN Classes ON Classes.class_id = Instructors_has_Classes.class_id AND Instructors.instructor_id = ${inst_id};`
    db.pool.query(get_inst_classes_query, (err, result) => {
        if (err) throw (err);
        res.json(result);
    })
})

//Update instructor
app.put('/instructors/:_id', (req, res) => {
    const inst_id = req.params._id;
    const { first_name, last_name, preferred_name, email, phone_number } = req.body;
    let update_inst_query = `UPDATE Instructors
    SET first_name = '${first_name}', last_name = '${last_name}', preferred_name = '${preferred_name}', email = '${email}', phone_number = '${phone_number}'
    WHERE instructor_id ='${inst_id}';`
    db.pool.query(update_inst_query, (err, result) => {
        if (err) throw (err);
        res.json(result);
    })
});

app.delete('/instructors/:_id', (req, res) => {
    const inst_id = req.params._id;
    let inst_del_query = `DELETE FROM Instructors WHERE instructor_id = ${inst_id};`
    db.pool.query(inst_del_query, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.delete('/instructors/:_id/classes', async(req, res) => {
    const inst_id = req.params._id;
    const class_ids = req.body;

    const class_ids_w_inst= await class_ids.map((class_id, i) => {
        return {_id:class_id, inst_id}
    })
    let responses = await Promise.all(
        class_ids_w_inst.map(async(one_class, i)=>{
            let inst_del_class_query = `DELETE FROM Instructors_has_Classes WHERE Instructors_has_Classes.instructor_id = '${one_class.inst_id}' AND Instructors_has_Classes.class_id = '${one_class._id}';`
            db.pool.query(inst_del_class_query, (err, result) => {
                if (err) throw err;
                return result;
            });
             
        })
    )
    res.json(responses)
})


// ...
// End Connect DB Activity Code.


app.listen(PORT, () => {
    // Change this text to whatever FLIP server you're on
    console.log(`Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`);
});
