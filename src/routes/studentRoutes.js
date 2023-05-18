const express = require("express");
const router = new express.Router();
const upload = require("express-fileupload");
const storage = require('node-sessionstorage')
router.use(upload());

const {
    checkAuthenticated,
    checkNotAuthenticated,
    checkIsTeacher,
    checkIsNotTeacher
} = require("../utils/middleware");
const path = require("path");
const connection = require("../utils/dbconnection");

router.get("/", [checkAuthenticated, checkIsNotTeacher], (req, res) => {
    res.render("index", {
        user: req.user
    });
})

router.get("/teams", [checkAuthenticated], (req, res) => {
    if (req.user.status == "teacher") {
        teacher = true;
        const sql = "SELECT * FROM `teaches_on` WHERE `email` LIKE '" + req.user.email + "'";
        storage.setItem('user', req.user.email)
        try {
            connection.query(sql, (err, rows) => {
                // console.log("rows inside tr", rows)
                if (err) {
                    console.log("error", err);
                } else {
                    return res.render("teams", {
                        teacher,
                        rows,
                    })
                }
            })
        } catch (e) {
            console.log(e);
            return res.redirect("/");
        }
    }
    else {
        const sql = "SELECT * FROM `study_on` WHERE `member` LIKE '" + req.user.email + "'";
        try {
            connection.query(sql, (err, rows) => {
                // console.log("rows inside st", rows)
                if (err) {
                    console.log("error", err);
                } else {
                    return res.render("teams", {
                        rows,
                    })
                }
            })
        } catch (e) {
            console.log(e);
            res.redirect("/");
        }
    }
})

router.get("/team-info", [checkAuthenticated], async (req, res) => {
    teamname = req.query.team_name
    console.log(teamname);
    teacher = false;
    if (req.user.status == "teacher") {
        teacher = true;
    }
    sql = "SELECT * FROM `assignment` WHERE `teamname` LIKE '" + teamname + "'";
    let assignment = await executeSQL(sql);
    sql = "SELECT * FROM `meeting` WHERE `teamname` LIKE '" + teamname + "'"
    let meetings = await executeSQL(sql);
    sql = "SELECT * FROM `notes` WHERE `teamname` LIKE '" + teamname + "'"
    let notes = await executeSQL(sql);
    sql = "SELECT * FROM `assignment-upload` WHERE `teamname` LIKE '" + teamname + "'"
    let assignment_upload = await executeSQL(sql);
    let students = await getStudents(teamname);
    let teachers = await getTeachers(teamname);
    console.log(assignment);
    console.log("teacher", teachers);
    console.log("student", students);
    res.render("team-info", {
        teacher,
        teachers,
        students,
        teamname,
        assignment_upload,
        assignment,
        meetings,
        notes
    })
})

router.get("/time-table", [checkAuthenticated, checkIsNotTeacher], async (req, res) => {

    let sql = "SELECT * FROM `study_on` WHERE `member` LIKE '" + req.user.email + "'";
    teams = await executeSQL(sql);
    let st = new Set();
    teams.forEach((it) => {
        // console.log("it",it)
        st.add(it);
    });
    // console.log(st);
    meet = [];
    st.forEach(async (it) => {
        // console.log(it.teamname);
        sql = "SELECT * FROM `meeting` WHERE `teamname` LIKE '" + it.team_name + "'";
        let assign = await executeSQL(sql);
        for (const iit in assign) {
            console.log("iit", assign[iit])
            meet.push(assign[iit]);
        }
    })
    // console.log(meet)
    res.render("time-table", {
        meet
    })
})

router.get("/assignments", [checkAuthenticated, checkIsNotTeacher], async (req, res) => {

    let sql = "SELECT * FROM `assignment` WHERE teamname IN (SELECT teamname from study_on WHERE member = '"+req.user.email+"');";
    asgmt = await executeSQL(sql);
    console.log(asgmt)
    console.log("rednering");
    res.render("assginments", {
        asgmt
    })
})

router.get("/pdf-viewer", (req, res) => {
    res.render("pdf-viewer", {
        filename: req.query.filename
    });
})

router.post("/assignment-upload", [checkAuthenticated, checkIsNotTeacher], (req, res) => {
    console.log("inisd assign-upload")
    console.log(req.query.teamname);
    const uploadpath = path.join(__dirname, "../../public/uploads");
    console.log(req.files);
    if (req.files.assignfile!=null) {
        var file = req.files.assignfile;
        console.log("file exist")
        const filename = file.name;
        try {
            const sql = "INSERT INTO `assignment-upload` (`id`, `teamname`, `assign-name`, `email`, `filename`) VALUES (NULL, '" + req.query.teamname + "', '" + req.query.assignName + "', '" + req.user.email + "', '" + filename + "');";
            console.log(sql)
            connection.query(sql, (err, rows) => {
                file.mv(uploadpath + "/" + filename, (error) => {
                    res.redirect("team-info?team_name=" + req.query.teamname);
                })
            })
        } catch (error) {
            console.log(error);
            res.redirect("team-info?team_name=" + req.query.teamname);
        }
    }
    // else{
    //     console.log("Failed");
    //     res.redirect("team-info?team_name=" + req.query.teamname);
    // }
})
const getStudents = (teamname) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT member FROM study_on as s, userdetail as u WHERE `team_name` LIKE '" + teamname + "' AND s.member = u.email";
        try {
            connection.query(sql, (err, rows) => {
                // console.log("rows inside st", rows)
                if (err) {
                    console.log("error", err);
                } else {
                    resolve(rows);
                }
            })
        } catch (e) {
            console.log(e);
            reject();
        }
    })
}

const getTeachers = (teamname) => {
    return new Promise((resolve, reject) => {
        sql = "SELECT t.email FROM teaches_on as t, userdetail as u WHERE `team_name` LIKE '" + teamname + "' AND t.email = u.email";
        try {
            connection.query(sql, (err, rows) => {
                // console.log("rows inside st", rows)
                if (err) {
                    console.log("error", err);
                } else {
                    resolve(rows);
                }
            })
        } catch (e) {
            console.log(e);
            reject();
        }

    })
}   

const executeSQL = (sql) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(sql, (err, rows) => {
                // console.log("rows inside st", rows)
                if (err) {
                    console.log("error", err);
                } else {
                    resolve(rows);
                }
            })
        } catch (e) {
            console.log(e);
            reject();
        }

    })
}

module.exports = router;