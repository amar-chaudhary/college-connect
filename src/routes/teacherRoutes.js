const express = require("express");
const router = new express.Router();
const path = require("path");
const {v4: uuidv4} = require("uuid");
const {
    checkAuthenticated,
    checkNotAuthenticated,
    checkIsTeacher,
    checkIsNotTeacher
} = require("../utils/middleware");
const connection = require("../utils/dbconnection");

router.get("/trdashboard", [checkAuthenticated, checkIsTeacher], (req, res) => {
    res.render("trdashboard");
})
router.get("/create-teams", [checkAuthenticated, checkIsTeacher], (req, res) => {
    res.render("create-teams", {
        tremail: req.user.email
    })
})
router.post("/create-team", [checkAuthenticated, checkIsTeacher], (req, res) => {
    // console.log("team", req.body);
    const teamName = req.body.teamName;
    const teamDesc = req.body.teamDesc;
    try {
        const sql = "INSERT INTO `teams` (`id`, `team_name`, `team_description`) VALUES (NULL, '" + teamName + "', '" + teamDesc + "');";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Team is created")
        })
    } catch (e) {
        return console.log(e);
    }
})
router.post("/add-student", [checkAuthenticated, checkIsTeacher], (req, res) => {
    // console.log("student:", req.body);
    const teamName = req.body.teamName;
    const memb = req.body.memb;
    try {
        const sql = "INSERT INTO `study_on` (`id`, `team_name`, `member`) VALUES (NULL, '" + teamName + "', '" + memb + "');";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Team memebrs are added")
        })
    } catch (e) {
        return console.log(e);
    }
})

router.post("/add-member", [checkAuthenticated, checkIsTeacher], async (req, res) => {
    // console.log("student:", req.body);
    const teamName = req.body.teamName;
    const memb = req.body.memb;
    const sql = "select status from `userdetail` where email='"+memb+"'";
    let results = await executeSQL(sql);
    try{
        console.log(results[0].status)
    }
    catch{
        res.redirect("user-invalid.html")
    }
    if (results[0].status === "student"){
    try {
        const sql = "INSERT INTO `study_on` (`id`, `team_name`, `member`) VALUES (NULL, '" + teamName + "', '" + memb + "');";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Team memebrs are added")
        })
    } catch (e) {
        console.log(e);
    }
}
else if (results[0].status === "teacher"){
    try {
        const sql = "INSERT INTO `teaches_on` (`id`, `team_name`, `email`) VALUES (NULL, '" + teamName + "', '" + memb + "');";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Team memebrs are added")
        })
    } catch (e) {
        return console.log(e);
    }
}

})
router.post("/add-teacher", [checkAuthenticated, checkIsTeacher], (req, res) => {
    // console.log("teacher", req.body);
    const teamName = req.body.teamName;
    const teacher = req.body.teacher;
    try {
        const sql = "INSERT INTO `teaches_on` (`id`, `email`, `team_name`) VALUES (NULL, '" + teacher + "', '" + teamName + "');";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Teacher memebrs are added")
        })
    } catch (e) {
        return console.log(e);
    }
})

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

router.get("/notices", [checkAuthenticated], (req, res) => {
    const sql = "SELECT * FROM `notices`";
    let teacher = false;
    if (req.user.status == "teacher") {
        teacher = true;
    }
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                // console.log(rows);
                return res.render("notices", {
                    teacher,
                    rows
                });
            } else {
                console.log(err)
            }
        })
    } catch (e) {
        return console.log(e);
    }
})
router.post("/notices", [checkAuthenticated, checkIsTeacher], (req, res) => {
    const msg = req.body.message;
    const sql = "INSERT INTO `notices` (`id`, `email`, `date`, `msg`) VALUES (NULL, '" + req.user.email + "', current_timestamp(), '" + msg + "');";
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                return res.redirect("notices");
            } else {
                console.log(err)
            }
        })
    } catch (e) {
        res.redirect("notices");
        console.log(e);
    }
})

router.post("/create-assignment", [checkAuthenticated, checkIsTeacher], (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO `assignment` (`assignment-name`, `assignment-desc`, `teamname`, `duedate`, `creationdate`) VALUES ('" + req.body.assignmentname + "', '" + req.body.assignmentdescription + "', '" + req.body.teamname + "', '" + req.body.duedate + "', current_timestamp());"
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                return res.send({
                    msg: "Assignment Created"
                })
            } else {
                console.log(err)
            }
        })
    } catch (e) {
        res.redirect("teams");
        console.log(e);
    }
})
router.post("/set-meeting", [checkAuthenticated, checkIsTeacher], (req, res) => {
    console.log(req.body);
    const uniqueid = uuidv4();;
    const sql = "INSERT INTO `meeting` (`teamname`, `uqid`, `date`, `title`) VALUES ('" + req.body.teamname + "', '" + uniqueid + "', '" + req.body.meetingdate + "', '" + req.body.meetingtitle + "');";
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                return res.send({
                    msg: "Meeting Set"
                })
            } else {
                console.log(err)
            }
        })
    } catch (e) {
        res.redirect("teams");
        console.log(e);
    }
})
router.post("/delete-meeting", [checkAuthenticated, checkIsTeacher], (req, res) => {
    console.log(req.body);
    const sql = "DELETE FROM meeting WHERE `meeting`.`uqid` = '"+req.query.meetingid+"'";
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                res.redirect("team-info?team_name=" + req.query.teamname);
            } else {
                console.log(err)
            }
        })
    } catch (e) {
        res.redirect("teams");
        console.log(e);
    }
})

router.post("/delete-team", [checkAuthenticated, checkIsTeacher], (req, res) => {
    console.log(req.body);
    const sql = "DELETE FROM `teams` WHERE `teams`.`team_name`  = '"+req.query.teamname+"'";
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                const sql2 = "DELETE FROM `teaches_on` WHERE `team_name`  = '"+req.query.teamname+"'";
                try {
                    connection.query(sql2, (err, rows) => {
                        if (!err) {
                        } else {
                            console.log(err)
                        }
                    })
                } catch (e) {
                    res.redirect("teams");
                    console.log(e);
                }
                const sql3 = "DELETE FROM `study_on` WHERE `team_name`  = '"+req.query.teamname+"'";
                try {
                    connection.query(sql3, (err, rows) => {
                        if (!err) {
                            res.redirect("teams");
                        } else {
                            console.log(err)
                        }
                    })
                } catch (e) {
                    res.redirect("teams");
                    console.log(e);
                }
             } else {
                console.log(err)
            }
        })
    } catch (e) {
        console.log(e);
    }
})

router.post("/assignment-delete", [checkAuthenticated, checkIsTeacher], (req, res) => {
    console.log(req.body);
    const sql = "DELETE FROM assignment WHERE `assignment-name` = '"+req.query.assignName+"'";
    try {
        connection.query(sql, (err, rows) => {
            if (!err) {
                res.redirect("team-info?team_name=" + req.query.teamname);
            } else {
                console.log(err)
            }
        })
    } catch (e) {
        console.log(e);
    }
})


router.post("/notes-upload", [checkAuthenticated, checkIsTeacher], (req, res) => {
    console.log("inisd enotes-upload")
    console.log(req.query.teamname);
    const uploadpath = path.join(__dirname, "../../public/uploads");
    // console.log(uploadpath);
    var file = req.files.file
    const filename = file.name;
    try {
        const sql = "INSERT INTO `notes` (`teamname`, `fileaddress`, `filename`) VALUES ('" + req.query.teamname + "', '" + uploadpath + "/" + filename + "', '"+filename+"');";
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

})

router.post("/delete-member", [checkAuthenticated, checkIsTeacher], async (req, res) => {
    // console.log("student:", req.body);
    const teamName = req.body.teamName;
    const memb = req.body.member;
    console.log(memb)
    const sql = "select status from `userdetail` where email='"+memb+"'";
    let results = await executeSQL(sql);
    console.log(results)
    console.log(results[0].status)
    if (results[0].status === "student"){
    try {
        const sql = "Delete from `study_on` where `member` ='" + memb + "';";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Team memebrs are deleted")
        })
    } catch (e) {
        return console.log(e);
    }
}
else if (results[0].status === "teacher"){
    try {
        const sql = "Delete from `teaches_on` where `email` = '" + memb + "';";
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            return res.send("Team memebrs are deleted")
        })
    } catch (e) {
        return console.log(e);
    }
}
})
module.exports = router;