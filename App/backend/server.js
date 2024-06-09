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


// Get all members
app.get('/members', (req, res)=>{
    const get_members_query = `SELECT * FROM Members;`
    db.pool.query(get_members_query, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
})


//Get one member
app.get('/members/:_id', (req, res) => {
    const mem_id = req.params._id
    let get_one_mem_query = `SELECT member_id, first_name, last_name, email, phone_number, member_since, membership_exp, birthdate, classes_completed
    FROM Members
    WHERE member_id = '${mem_id}';`
    db.pool.query(get_one_mem_query, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
})

// Create new mmeber
app.post('/members', (req, res) => {
    const { first_name, last_name, email, phone_number, birthdate, member_since, membership_exp } = req.body;

    let query_create_member = `INSERT INTO Members (first_name, last_name, email, phone_number, birthdate, member_since, membership_exp)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone_number}', '${birthdate}','${member_since}', '${membership_exp}');`
    db.pool.query(query_create_member, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

//Update member
app.put('/members/:_id', (req, res) => {
    const member_id = parseInt(req.params._id);
    const { first_name, last_name, email, phone_number, birthdate, member_since, membership_exp } = req.body;

    let query_update_member = `UPDATE Members
    SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', phone_number = '${phone_number}', member_since = '${member_since}', membership_exp = '${membership_exp}', birthdate = '${birthdate}'
    WHERE member_id = '${member_id}';`
    db.pool.query(query_update_member, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

//Delete member
app.delete('/members/:_id', (req, res) => {
    const member_id = req.params._id;
    let query_delete_member = `DELETE FROM Members WHERE member_id = '${member_id}';`
    db.pool.query(query_delete_member, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

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


//CREATE A CLASS
app.post('/classes', (req, res) => {
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

//Get all schedules
app.get('/schedules', (req, res) => {
    let sch_get_query = 'SELECT Schedules.schedule_id, Schedules.class_id ,Schedules.date, Schedules.start_time, Schedules.end_time, Schedules.day_of_the_week, Schedules.instructor, Schedules.members_enrolled, Schedules.status, Classes.name AS class_name FROM Schedules JOIN Classes ON Schedules.class_id = Classes.class_id;'
    db.pool.query(sch_get_query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//Get one schedule
app.get('/schedules/:_id', (req, res) => {
    const sch_id = req.params._id;
    let get_sch_query = `SELECT Schedules.schedule_id, Schedules.class_id ,Schedules.date, Schedules.start_time, Schedules.end_time, Schedules.day_of_the_week, Schedules.instructor, Schedules.members_enrolled, Schedules.status, Classes.name AS class_name FROM Schedules JOIN Classes ON Schedules.class_id = Classes.class_id
    WHERE schedule_id='${sch_id}';`
    db.pool.query(get_sch_query, (err, result) => {
        if (err) throw (err);
        res.json(result);
    })
});

//Add schedule
app.post('/schedules', (req, res) => {
    const {class_id, date, start_time, end_time, day_of_the_week, instructor} = req.body
    let add_sch_query = `INSERT INTO Schedules (class_id ,date, start_time, end_time, day_of_the_week, instructor)
    VALUES('${class_id}', '${date}', '${start_time}', '${end_time}', '${day_of_the_week}', '${instructor}');`
    db.pool.query(add_sch_query, (err, result) => {
        if (err) throw (err);
        res.json(result);
    })
});

//Update schedule
app.put('/schedules/:_id', (req, res) => {
    const sch_id = req.params._id;
    const {class_id, date, start_time, end_time, day_of_the_week, instructor, status} = req.body;
    let update_sch_query = `UPDATE Schedules
    SET class_id='${class_id}' ,date='${date}', start_time='${start_time}', end_time='${end_time}', day_of_the_week='${day_of_the_week}', instructor='${instructor}', status='${status}' WHERE schedule_id = ${sch_id};`
    db.pool.query(update_sch_query, (err, result) => {
        if (err) throw (err);
        res.json(result);
    })
})


//schedule member
app.post('/members/:_member_id/sign-up-schedules', async(req, res) => {
    const member_id = req.params._member_id
    const {schedule_id, members_enrolled} = req.body
    let post_sch_for_mem_query = `INSERT INTO Sign_up_Schedules(member_id,schedule_id)
    VALUES ('${member_id}', '${schedule_id}' );`
    let update_members_enrolled_query = `UPDATE Schedules
    SET members_enrolled='${members_enrolled + 1}' WHERE schedule_id = ${schedule_id};`
    db.pool.query(post_sch_for_mem_query, (err, result) => {
        if(err) throw(err);
    })
    db.pool.query(update_members_enrolled_query, (err, result) => {
        if(err) throw(err);
    })
    res.send("Class scheduled!")
})

//get members enrolled for a class
app.get('/schedules/:_id/members-enrolled', async(req, res) => {
    const schedule_id = req.params._id;
    let get_members_enrolled_query = `SELECT Schedules.schedule_id, Classes.name AS class_name, Schedules.start_time, Schedules.date, Members.member_id, Members.first_name, Members.last_name, Members.email
    FROM Sign_up_Schedules JOIN Schedules ON Sign_up_Schedules.schedule_id = Schedules.schedule_id
    JOIN Classes ON Classes.class_id = Schedules.class_id 
    JOIN Members ON Sign_up_Schedules.member_id = Members.member_id AND Schedules.schedule_id = '${schedule_id}';`
    db.pool.query(get_members_enrolled_query, (err, result) => {
        if(err) throw(err);
        res.json(result)
    })
})

//get classes enrolled for one memeber
app.get('/members/:_id/classes', (req, res)=> {
    const member_id = req.params._id;
    const read_members_classes_query = `SELECT Schedules.schedule_id, Schedules.date, Schedules.start_time, Schedules.instructor, Classes.name AS class_name
    FROM Sign_up_Schedules JOIN Members ON Sign_up_Schedules.member_id = Members.member_id
    JOIN Schedules ON Schedules.schedule_id = Sign_up_Schedules.schedule_id
    JOIN Classes ON Schedules.class_id = Classes.class_id AND Sign_up_Schedules.member_id = '${member_id}'
    ORDER BY Schedules.date DESC, Schedules.start_time;`
    db.pool.query(read_members_classes_query, (err, result)=> {
        res.json(result)
    })
})

//delete sing up
app.delete('/members/:_id/classes/:schedule_id', (req, res)=> {
    console.log("here")
    const member_id = req.params._id;
    const schedule_id = req.params.schedule_id
    const read_members_classes_query = `DELETE FROM Sign_up_Schedules WHERE schedule_id = '${schedule_id}' AND member_id='${member_id}';`
    db.pool.query(read_members_classes_query, (err, result)=> {
        res.json(result)
    })

})
// ...
// End Connect DB Activity Code.


app.listen(PORT, () => {
    // Change this text to whatever FLIP server you're on
    console.log(`Server running:  http://classwork.engr.oregonstate.edu:${PORT}...`);
});
